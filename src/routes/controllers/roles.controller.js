import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  getUserbyUsername,
} from '../../utils/helpers.utils';

const { User } = models;

/**
 * Fetch all users and roles
 *
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {*} success response
 * @throws {*} error if database error
 */
export async function getAllRoles(req, res) {
  try {
    const roles = await User.findAll({
      attributes: ['id', 'email', 'username', 'role'],
    });
    return successResponse(res, 200, 'roles fetched successfully', roles);
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}

/**
 * Make a user an admin
 *
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {*} success response
 * @throws {*} error if database error
 */
export async function updateUserRole(req, res) {
  const { role } = req.body;
  const { username } = req.params;

  const user = await getUserbyUsername(username);
  if (!user) {
    return errorResponse(res, 404, 'This user does not exist', true);
  }
  if (user.role === role.toUpperCase()) {
    return errorResponse(res, 409, `This user is already an ${role}`, true);
  }

  try {
    const updatedUser = await User.update(
      { role: role.toUpperCase() },
      { where: { username }, returning: true },
    );
    return successResponse(res, 200, 'role updated successfully', updatedUser);
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}
