import models from '../../db/models';
import { successResponse, errorResponse } from '../../utils/helpers';

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
    const results = await User.findAll();
    return successResponse(res, 200, 'success', results);
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
    const author = await User.findOne({
      where: {
        username,
      },
    });
    if (!author) {
      return errorResponse(res, 404, 'Author not found');
    }
    return successResponse(res, 200, 'Get profile successful', author);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
}
