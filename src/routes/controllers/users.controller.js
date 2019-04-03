import models from '../../db/models';
// import { successResponse, errorResponse } from '../../utils/helpers.utils';
import {
  errorResponse,
  successResponse,
  findUserbyId,
} from '../../utils/helpers.utils';

const { User } = models;

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
    });
    if (!authorProfile) {
      return errorResponse(res, 404, 'Author not found');
    }
    return successResponse(res, 200, 'Get profile request successful', {
      authorProfile,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
}
/**
 * Get current User
 * @constructor
 * @param {object} req
 * @param {object} res
 * @param {uuid} userId - The uuid variable.
 */
export const getUserProfile = async (req, res) => {
  const { url } = req;
  const { user } = req;
  const { userId } = req.params;
  let userFound;

  try {
    if (url.includes('profiles')) {
      userFound = await findUserbyId(userId);
    } else {
      userFound = await findUserbyId(user.id);
    }
    if (!userFound) {
      return errorResponse(res, 404, 'The userID provided does not exist');
    }
    return successResponse(res, 200, 'Your requested profile', userFound);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

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
      'Your profile has been updated succesfully',
      [dataValues],
    );
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
