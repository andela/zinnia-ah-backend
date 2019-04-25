import moment from 'moment';

import models from '../../db/models';
import {
  errorResponse,
  successResponse,
  serverError,
  getUserbyId,
  getUserbyUsername,
} from '../../utils/helpers.utils';

const { User, ReadingStat, Article, Report, Comment, CommentLike } = models;

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @returns {object} all authors
 */
export async function getAllAuthors(req, res) {
  try {
    const authors = await User.findAll();
    return successResponse(res, 200, 'success', { authors });
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
 * @returns {object} author's profile
 */
export async function getAuthorProfile(req, res) {
  const { username } = req.params;
  try {
    const authorProfile = await User.findOne({
      where: {
        username,
      },
      include: {
        model: Article,
        as: 'publications',
      },
    });
    if (!authorProfile) {
      return errorResponse(res, 404, 'Author not found');
    }

    const fullProfile = authorProfile.toJSON();
    fullProfile.followers = await authorProfile
      .getFollowers()
      .map(followee => ({
        id: followee.id,
        firstname: followee.firstname,
        lastname: followee.lastname,
        username: followee.username,
        email: followee.email,
      }));
    fullProfile.followings = await authorProfile
      .getFollowings()
      .map(followee => ({
        id: followee.id,
        firstname: followee.firstname,
        lastname: followee.lastname,
        username: followee.username,
        email: followee.email,
      }));
    return successResponse(
      res,
      200,
      'Get profile request successful',
      fullProfile,
      authorProfile.author,
    );
  } catch (error) {
    return serverError(res);
  }
}

/**
 * Update user profile.
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
export const updateUserProfile = async (req, res) => {
  const { id } = req.user;
  const { firstName, lastName, username, bio, image } = req.body;
  const user = await getUserbyId(id);
  try {
    const profileUpdate = await User.update(
      {
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        username: username || user.username,
        bio: bio || user.bio,
        image: image || user.image,
      },
      {
        returning: true,
        where: { id },
      },
    );
    const { dataValues } = profileUpdate[1][0];
    delete dataValues.password;
    return successResponse(
      res,
      200,
      'Your profile has been updated successfully',
      dataValues,
    );
  } catch (err) {
    return serverError(res);
  }
};

/**
 *
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Array} user reading statistics
 */
export async function getReadingStats(req, res) {
  const { id } = req.user;

  try {
    const readingStats = await ReadingStat.findAndCountAll({
      where: {
        userId: id,
      },
      include: {
        model: Article,
        as: 'article',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
      order: [['createdAt', 'DESC']],
    });

    return successResponse(res, 200, 'reading stats', readingStats);
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 *
 * @export
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Array} user reports
 */
export async function getUsersReports(req, res) {
  const { user } = req;

  try {
    const usersReportedArticle = await Report.findAll({
      where: { userId: user.id },
    });
    return successResponse(res, 200, 'Successfully retrieved all reports', {
      articles: usersReportedArticle,
    });
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Array} user bookmarks
 */
export async function getUsersBookmarks(req, res) {
  const { user } = req;

  try {
    const currentUser = await getUserbyId(user.id);
    const usersBookmarks = await currentUser.getBookmarks();
    return successResponse(res, 200, 'Successfully retrieved all bookmarks', {
      bookmarks: usersBookmarks,
    });
  } catch (error) {
    return serverError(res);
  }
}

/**
 *
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Array} users comments
 */
export async function getUsersComments(req, res) {
  const { user } = req;

  try {
    const userComments = await Comment.findAll({
      where: { userId: user.id },
      include: {
        model: Article,
        as: 'article',
        attributes: ['title'],
      },
    });
    return successResponse(res, 200, 'Successfully retrieved all comments', {
      comments: userComments,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
}

/**
 *
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Array} user likes
 */
export async function getAllUserLikes(req, res) {
  const { user } = req;
  const { type } = req.query;

  try {
    const currentUser = await getUserbyId(user.id);

    if (type === 'articles' || type === 'article') {
      const allArticlesLikedByUser = await currentUser.getLikes();
      return successResponse(
        res,
        200,
        'Successfully retrieved all articles liked by user',
        { articles: allArticlesLikedByUser },
      );
    } else if (type === 'comments' || type === 'comment') {
      const allCommentsLikedByUser = await CommentLike.findAll({
        where: { userId: user.id },
      });
      return successResponse(
        res,
        200,
        'Successfully retrieved all comments liked by user',
        { comments: allCommentsLikedByUser },
      );
    }
    const allArticlesLikedByUser = await currentUser.getLikes();
    const allCommentsLikedByUser = await CommentLike.findAll({
      where: { userId: user.id },
    });
    return successResponse(
      res,
      200,
      'Successfully retrieved all likes by user',
      {
        articles: allArticlesLikedByUser,
        comments: allCommentsLikedByUser,
      },
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
}
