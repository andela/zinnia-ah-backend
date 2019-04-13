import Joi from 'joi';
import { errorResponse, verifyToken } from '../utils/helpers';
import { newUserSchema } from '../../utils/validationSchema';

/**
 * Input validator for a new user account
 * @param {Object} req - Express HTTP Request Object
 * @param {Object} res - Express HTTP Response Object
 * @param {Object} next - On to the next handler
 * @returns {Object} Error Response if validation fails
 * @callback next when validation passes
 */
const validateNewUser = (req, res, next) => {
  const { error } = Joi.validate(req.body, newUserSchema, {
    abortEarly: false,
    language: {
      key: '{{key}} ',
    },
  });
  if (error) {
    const validationError = error.details.map(errorItem => errorItem.message);
    return errorResponse(res, 422, 'validation error', validationError);
  }
  next();
};

export const verifyUser = async (req, res, next) => {
  try {
    const userInfo = await verifyToken(
      req.headers['x-access-token'] || req.headers.authorization,
    );
    if (!userInfo) {
      throw new Error('token must be provided');
    }

    req.user = { id: userInfo.id };
    next();
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
};

export default validateNewUser;
