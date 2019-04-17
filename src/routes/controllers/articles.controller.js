import crypto from 'crypto';
import slug from 'slug';

import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  verifyToken,
} from '../../utils/helpers.utils';
import { calculateTimeToReadArticle } from '../../utils/readtime.utils';

const { Article, User } = models;

/**
 * passes new article to be created to the model
 * @param {object} req
 * @param {object} res
 * @returns {object} article creation error/success message.
 */
export async function createArticle(req, res) {
  const { title, description, body, images, tags } = req.body;
  if (!title || !description || !body) {
    return errorResponse(
      res,
      422,
      'invalid/empty input. all fields must be specified.',
    );
  }
  try {
    const userInfo = await verifyToken(
      req.headers['x-access-token'] || req.headers.authorization,
    );
    if (!userInfo) {
      return errorResponse(res, 401, 'jwt must be provided');
    }
    const timeToReadArticle = calculateTimeToReadArticle({
      images: images.split(','),
      videos: [],
      words: body,
    });
    const createdArticle = await Article.create({
      userId: userInfo.id,
      title,
      slug: slug(
        `${title}-${crypto.randomBytes(12).toString('base64')}`,
      ).toLowerCase(),
      description,
      body,
      imageList: images,
      tagList: tags,
      readTime: timeToReadArticle,
      subscriptionType: 'free',
      status: 'draft',
    });
    return successResponse(
      res,
      201,
      'your article has been created successfully',
      createdArticle,
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
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
            'article as been deleted successfully',
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
    return errorResponse(res, 500, err.message);
  }
}

/**
 * Fetch a single article
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with article object if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function getArticle(req, res) {
  const { articleId } = req.params;

  try {
    const article = await Article.findByPk(articleId, {
      attributes: {
        exclude: ['id', 'userId', 'subscriptionType', 'readTime'],
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'username'],
        },
      ],
    });

    if (article) {
      return successResponse(
        res,
        200,
        'Article successfully retrieved',
        article,
      );
    }

    return errorResponse(res, 404, 'Article does not exist');
  } catch (error) {
    return errorResponse(res, 500, 'An error occured', error.message);
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

    await user.addLike(article);
    const userData = user.toJSON();
    const likes = await user.getLikes();

    userData.likes = likes.map(item => {
      return { title: item.title, id: item.id, slug: item.slug };
    });

    return successResponse(res, 200, 'Article has been liked', {
      userData,
    });
  } catch (error) {
    return errorResponse(res, 500, error.toString());
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

    await user.removeLike(article);
    const userData = user.toJSON();
    const likes = await user.getLikes();

    userData.likes = likes.map(item => {
      return { title: item.title, id: item.id, slug: item.slug };
    });

    return successResponse(res, 200, 'unlike article successful', {
      userData,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
}
