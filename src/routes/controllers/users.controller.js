import moment from 'moment';

import models from '../../db/models';
import { errorResponse, successResponse } from '../../utils/helpers.utils';

const { User, ReadingStat, Article } = models;

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
    if (!authors[0]) {
      return errorResponse(res, 404, 'There are no existing authors yet');
    }
    return successResponse(res, 200, 'success', { authors });
  } catch (error) {
    return errorResponse(res, 501, error.message);
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
    return errorResponse(res, 500, error.message);
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
    return errorResponse(res, 500, err.message);
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
    return errorResponse(res, 500, error.message);
  }
}
