import dotenv from 'dotenv';
import Joi from 'joi';

import {
  errorResponse,
  verifyToken,
  getUserbyId,
} from '../../utils/helpers.utils';
import { tokenId } from '../../utils/validation-schema.utils';

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
  const decoded = await verifyToken(token, process.env.SECRET_KEY);

  if (!decoded) {
    return errorResponse(
      res,
      400,
      'Token is invalid, please provide a valid token',
    );
  }

  //check to ensure the token id is a valid uuid
  const { error } = Joi.validate(decoded, tokenId, {
    language: {
      key: '{{key}} ',
    },
    abortEarly: false,
  });

  if (error) {
    return errorResponse(res, 400, error);
  }
  // check if the user with the token still exists
  const existingUser = await getUserbyId(decoded.id);

  if (!existingUser) {
    return errorResponse(
      res,
      400,
      'User with this token does not exist, Please signup',
    );
  }
  // attach the existing user to the header
  req.user = decoded;

  return next();
};

export default checkAuthorizedUser;
