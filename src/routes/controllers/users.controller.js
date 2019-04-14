import models from '../../db/models';
import { successResponse, errorResponse } from '../../utils/helpers.utils';

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
