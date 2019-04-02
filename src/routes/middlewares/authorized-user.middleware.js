import jwt from 'jsonwebtoken';

import { errorResponse } from '../../utils/helpers.utils';

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */
export async function checkAuthorizedUser(req, res, next) {
  const header = req.headers.authorization || req.headers['x-access-token'];
  if (typeof header === 'undefined') {
    return errorResponse(
      res,
      401,
      'You are not authorized to make this action',
    );
  }

  const token = header.split(' ')[1];
  if (!token) {
    return errorResponse(
      res,
      401,
      'You are not authorized to make this action please login',
    );
  }
  try {
    const decoded = await jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
}
