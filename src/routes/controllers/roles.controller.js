import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  getUserbyEmail,
} from '../../utils/helpers.utils';
import { AUTHOR, ADMIN } from '../../utils/constants';

const { User } = models;

/**
 * Fetch all users and roles
 *
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {*} success response
 * @throws {*} error if database error
 */
export async function getAll(req, res) {
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
export async function makeAdmin(req, res) {
  const { email } = req.body;
  const role = ADMIN;

  const user = await getUserbyEmail(email);
  if (!user) {
    return errorResponse(res, 404, 'This user does not exist', true);
  }
  if (user.role === role) {
    return errorResponse(res, 409, 'This user is already an admin', true);
  }

  try {
    await User.update({ role: ADMIN }, { where: { email } });
    return successResponse(res, 200, 'role updated successfully', { role });
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}

/**
 * Revoke a users' admin access
 *
 * @param {Object} req express request object
 * @param {Object} res express response object
 * @returns {*} success response
 * @throws {*} error if database error
 */
export async function revokeAdmin(req, res) {
  const { email } = req.body;
  const role = AUTHOR;

  const user = await getUserbyEmail(email);
  if (!user) {
    return errorResponse(res, 404, 'This user does not exist', true);
  }
  if (user.role === role) {
    return errorResponse(res, 409, 'This user is not an admin', true);
  }

  try {
    await User.update({ role: AUTHOR }, { where: { email } });
    return successResponse(res, 200, 'role updated successfully', { role });
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}
