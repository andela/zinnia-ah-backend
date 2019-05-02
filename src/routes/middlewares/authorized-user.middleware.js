import dotenv from 'dotenv';

import {
  errorResponse,
  verifyToken,
  getConfirmedUser,
  isValidUuid,
} from '../../utils/helpers.utils';

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */

dotenv.config();

const checkAuthorizedUser = async (req, res, next) => {
  const token =
    req.headers.authorization ||
    req.headers['x-access-token'] ||
    req.params.token;

  if (!token) {
    return errorResponse(res, 401, 'Please provide a JWT token');
  }

  //Decode token to check if it contains valid user payload;
  const decoded = await verifyToken(token);

  if (!decoded) {
    return errorResponse(
      res,
      400,
      'Token is invalid, please provide a valid token',
    );
  }

  //check to ensure the token id is a valid uuid
  const tokenIdIsValidUuid = await isValidUuid(decoded.id);

  if (!tokenIdIsValidUuid) {
    return errorResponse(res, 400, 'Invalid token content');
  }
  // check if the user with the token still exists
  const existingUser = await getConfirmedUser(decoded.id);

  if (!existingUser) {
    return errorResponse(
      res,
      400,
      'User account does not exist or is not activated',
    );
  }
  // attach the existing user to the header
  req.user = decoded;

  return next();
};

export default checkAuthorizedUser;
