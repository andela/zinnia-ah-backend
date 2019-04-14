import models from '../../db/models';
import { successResponse, errorResponse } from '../../utils/helpers.utils';

const { Role } = models;

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
    const roles = await Role.findAll();
    return successResponse(res, 200, 'roles fetched successfully', roles);
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}
