import Joi from 'joi';
import { errorResponse } from '../../utils/helpers.utils';
import { newUserSchema } from '../../utils/validation-schema.utils';

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
      key: '{{key}} '
    }
  });
  if (error) {
    const validationError = error.details.map(errorItem => errorItem.message);
    return errorResponse(res, 422, 'validation error', validationError);
  }
  next();
};

export default validateNewUser;
