import crypto from 'crypto';
import slug from 'slug';
import { Op } from 'sequelize';

import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  verifyToken,
  getArticlebyId,
  serverError,
  isValidUuid,
  excludeProperty,
} from '../../utils/helpers.utils';
import { FREE, DRAFT } from '../../utils/constants';
import { calculateTimeToReadArticle } from '../../utils/readtime.utils';
import { sendMailer } from '../../config/mail-config';
import {
  PLAGIARISM,
  TERRORISM,
  PROFANITY,
  DISCRIMINATORY,
  ADULT_CONTENT,
  OTHER,
} from '../../utils/constants';
import { createTag } from './tags.controller';
import newArticleNotification from '../../utils/notifications/article-notification.utils';

const {
  Article,
  User,
  Report,
  ReadingStat,
  Rating,
  Comment,
  CommentLike,
  Tag,
} = models;

/**
 * passes new article to be created to the model
 * @param {object} req
 * @param {object} res
 * @returns {object} article creation error/success message.
 */
export async function createArticle(req, res) {
  const { description, body, images, imageThumbnail, tags, status } = req.body;
  try {
    const timeToReadArticle = calculateTimeToReadArticle({
      images: images || [],
      videos: [],
      words: body,
    });

    const createdArticle = await Article.create({
      ...req.body,
      userId: req.user.id,
      readTime: timeToReadArticle.toString(),
      slug: slug(
        `${req.body.title}-${crypto.randomBytes(12).toString('base64')}`,
      ).toLowerCase(),
      description,
      body,
      imageThumbnail,
      readTime: timeToReadArticle,
      subscriptionType: FREE,
      status: status || DRAFT,
    });

    if (tags) {
      const createdTag = await createTag(tags, createdArticle.id);
      if (!createdTag) {
        return errorResponse(
          res,
          415,
          'tags should be an array, string provided',
        );
      }
    }

    await newArticleNotification(req.user.id, createArticle);
    return successResponse(
      res,
      201,
      'your article has been created successfully',
      createdArticle,
    );
  } catch (error) {
    return serverError(res);
  }
}

/**
 * @description users can delete articles there have created.
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export async function removeArticle(req, res) {
  try {
    const userInfo = await verifyToken(
      req.headers['x-access-token'] || req.headers.authorization,
    );
    const article = await Article.findOne({
      where: { id: req.params.article_id },
    });

    if (article) {
      if (article.userId === userInfo.id) {
        const deletedArticle = await Article.destroy({
          where: { id: req.params.article_id },
        });
        if (deletedArticle) {
          return successResponse(
            res,
            200,
            'article has been deleted successfully',
          );
        }
        return errorResponse(res, 404, 'article does not exist');
      }
      return errorResponse(
        res,
        401,
        'you are not authorized to perform this action',
      );
    }
    return errorResponse(res, 404, 'article not found');
  } catch (err) {
    if (err.message.match(/syntax/g)) {
      return errorResponse(res, 404, 'article does not exist', err.message);
    }
    return serverError(res);
  }
}

/**
 * Fetch a single article
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with article object if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function getSingleArticle(req, res) {
  const { articleId } = req.params;
  let requestUser;
  let articleParam;

  if (await isValidUuid(articleId)) {
    articleParam = { id: articleId };
  } else {
    articleParam = { slug: articleId };
  }

  const token = req.headers.authorization || req.headers['x-access-token'];

  if (token) {
    const { id } = await verifyToken(token);
    requestUser = await User.findByPk(id);
  }

  try {
    const article = await Article.findOne({
      where: { ...articleParam },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'username', 'image'],
        },
        {
          model: Rating,
          as: 'ratings',
          attributes: ['id', 'userId', 'articleId', 'rating'],
        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'author',
              attributes: ['username', 'image'],
            },
            {
              model: CommentLike,
              as: 'likes',
            },
          ],
        },
        {
          model: Tag,
          as: 'tags',
          attributes: ['name'],
        },
      ],
    });

    if (article) {
      // record the user reading the article
      const currentArticle = article.toJSON();
      currentArticle.likes = await article.getLikes().map(like => ({
        id: like.id,
        firstName: like.firstName,
        lastName: like.lastName,
        username: like.username,
        email: like.email,
      }));

      await recordARead(article.id, requestUser);
      return successResponse(res, 200, '', currentArticle);
    }
    return errorResponse(res, 404, 'Article does not exist');
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} likeAnArticle success/error message and user data
 */
export async function likeAnArticle(req, res) {
  const { id } = req.user;
  const { articleId } = req.params;

  try {
    const user = await User.findByPk(id);
    const article = await Article.findByPk(articleId);

    if (!article) return errorResponse(res, 404, 'Article does not exist');

    await user.addLike(article);
    const userDetails = user.toJSON();
    const userData = excludeProperty(userDetails, ['password']);
    const likes = await user.getLikes();

    userData.likes = likes.map(item => {
      return { title: item.title, id: item.id, slug: item.slug };
    });

    return successResponse(res, 200, 'Article has been liked', {
      userData,
    });
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} unlikeAnArticle success/error message and user data
 */
export async function unlikeAnArticle(req, res) {
  const { id } = req.user;
  const { articleId } = req.params;

  try {
    const user = await User.findByPk(id);
    const article = await Article.findByPk(articleId);

    if (!article) return errorResponse(res, 404, 'Article does not exist');

    await user.removeLike(article);
    const userDetails = user.toJSON();
    const userData = excludeProperty(userDetails, ['password']);
    const likes = await user.getLikes();

    userData.likes = likes.map(item => {
      return { title: item.title, id: item.id, slug: item.slug };
    });

    return successResponse(res, 200, 'unlike article successful', {
      userData,
    });
  } catch (error) {
    return serverError(res);
  }
}

/**
 * Share a single article via email
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with shareable link of article if article exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function shareArticleViaEmail(req, res) {
  const { articleId } = req.params;
  const { email } = req.body;

  const article = await Article.findByPk(articleId, {
    attributes: {
      exclude: ['id', 'userId', 'subscriptionType', 'readTime'],
    },
    include: [
      {
        model: User,
        as: 'author',
      },
    ],
  });
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.LOCAL_URL}/articles/${articleId}`
      : `${process.env.PRODUCTION_URL}/articles/${articleId}`;
  const body = {
    receivers: [`${email}`],
    subject: 'Authors Haven: An article has been shared with you',
    text: '',
    html: `<p> An article titled: ${article.title} by ${
      article.author.username
    } has been shared with you. Go <a href="${url}">here</a>  to read.</p> `,
  };

  try {
    await sendMailer(body);
    return successResponse(res, 200, 'Article has been successfully shared', {
      article,
    });
  } catch (error) {
    return errorResponse(
      res,
      500,
      'Article could not be shared',
      error.message,
    );
  }
}

/**
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} bookmarkArticle
 */
export async function bookmarkArticle(req, res) {
  const { id } = req.user;
  const { articleId } = req.params;

  try {
    const user = await User.findByPk(id);
    const article = await Article.findByPk(articleId);

    if (!article) return errorResponse(res, 404, 'Article does not exist');

    await user.addBookmarks(article);
    const userDetails = user.toJSON();
    const userData = excludeProperty(userDetails, ['password']);
    const bookmarks = await user.getBookmarks();

    userData.bookmarks = bookmarks.map(item => {
      return { title: item.title, id: item.id, slug: item.slug };
    });

    return successResponse(res, 200, 'Article successfully bookmarked', {
      userData,
    });
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 *
 * @export
 * @param {*} req
 * @param {*} res
 * @returns {object} removeBookmark response
 */
export async function removeBookmark(req, res) {
  const { id } = req.user;
  const { articleId } = req.params;

  try {
    const user = await User.findByPk(id);
    const article = await Article.findByPk(articleId);

    if (!article) return errorResponse(res, 404, 'Article does not exist');

    await user.removeBookmarks(article);
    const userDetails = user.toJSON();
    const userData = excludeProperty(userDetails, ['password']);
    const bookmarks = await user.getBookmarks();

    userData.bookmarks = bookmarks.map(item => {
      return { title: item.title, id: item.id, slug: item.slug };
    });

    return successResponse(res, 200, 'Bookmark successfully removed', {
      userData,
    });
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} report an article
 */
export async function reportArticle(req, res) {
  const { articleId } = req.params;
  const { user } = req;
  const { reportType, content } = req.body;
  const reportArray = [
    PLAGIARISM,
    PROFANITY,
    DISCRIMINATORY,
    ADULT_CONTENT,
    TERRORISM,
    OTHER,
  ];

  const article = await getArticlebyId(articleId);
  if (!article) return errorResponse(res, 404, 'Article does not exist', true);

  if (reportArray.includes(reportType.toUpperCase()) === false) {
    return errorResponse(
      res,
      400,
      `${reportType} is not a report type, Please kindly choose "Other" if your category is not listed`,
      true,
    );
  }

  try {
    const reportedArticle = await Report.create({
      userId: user.id,
      articleId: article.id,
      reportType: reportType.toUpperCase(),
      content,
    });
    return successResponse(
      res,
      200,
      'Article has been reported',
      reportedArticle,
    );
  } catch (error) {
    return errorResponse(
      res,
      500,
      'Article could not be reported',
      error.message,
    );
  }
}

const recordARead = async (articleId, user = null) => {
  let userId;
  if (user) {
    userId = user.id;
  } else {
    userId = null;
  }
  return await ReadingStat.create({ articleId, userId });
};

/**
 * Fetch all articles
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with articles array if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function getAllArticles(req, res) {
  const currentPage = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = limit * (currentPage - 1);

  try {
    const articles = await Article.findAndCountAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'username', 'image'],
        },
      ],
      limit,
      offset,
    });

    return successResponse(res, 200, '', articles);
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} rateArticle success/error message and article data
 */
export const rateArticle = async (req, res) => {
  const { rating } = req.body;
  const { articleId } = req.params;
  const { id: userId } = req.user;

  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return errorResponse(res, 404, 'This article was not found');
    }

    const [createdRating, isNewRecord] = await Rating.findOrCreate({
      where: { articleId, userId },
      defaults: { rating },
    });

    if (!isNewRecord && createdRating.rating !== rating) {
      await createdRating.update({
        rating,
      });
    }

    const ratedArticle = await Article.findByPk(articleId, {
      include: [
        {
          model: Rating,
          as: 'ratings',
          attributes: ['rating', 'userId'],
        },
      ],
    });

    const ratedArticleJSON = ratedArticle.toJSON();
    ratedArticleJSON.averageRating = calcAverageRating(
      ratedArticleJSON.ratings,
    );
    delete ratedArticleJSON.ratings;

    return successResponse(
      res,
      200,
      'Your rating has been recorded',
      ratedArticleJSON,
    );
  } catch (error) {
    return serverError(res);
  }
};

/**
 *
 *
 * @param {array} ratings
 * @returns {number} averageRating
 */
function calcAverageRating(ratings) {
  // get an array of only the ratings
  const allRatings = ratings.map(item => {
    return item.rating;
  });

  const averageRating =
    allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

  return averageRating;
}

/**
 * updates articles
 * @param {object} req
 * @param {object} res
 * @returns {object} article update error/success message.
 */
export async function updateArticle(req, res) {
  try {
    const article = await Article.findOne({ where: { slug: req.params.slug } });
    if (!article) {
      return errorResponse(res, 404, 'article does not exist', article);
    }
    if (article.userId !== req.user.id) {
      return errorResponse(
        res,
        401,
        'You are not authorized to make this action',
      );
    }
    const updatedArticle = await Article.update(req.body, {
      where: {
        slug: req.params.slug,
        userId: req.user.id,
      },
      returning: true,
    });
    return successResponse(
      res,
      200,
      'article update successful',
      updatedArticle[1][0],
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
}

/**
 * Fetch all trending articles
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with articles array if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function trendingArticles(req, res) {
  try {
    const articles = await Article.findAndCountAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          where: { comments: { [Op.not]: [] } },
          attributes: ['id'],
        },
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'username', 'image'],
        },
      ],
      limit: 6,
    });

    return successResponse(res, 200, '', articles);
  } catch (error) {
    return serverError(res);
  }
}
