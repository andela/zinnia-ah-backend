import Joi from 'joi';
import { errorResponse } from '../../utils/apiResponse';
import schema from '../../utils/validationSchema';

const { newUserSchema } = schema;

/**
 * Input validator for a new user account
 * @param {Object} request - Express HTTP Request Object
 * @param {Object} response - Express HTTP Response Object
 * @param {Object} next - On to the next handler
 * @returns {Object} Error Response if validation fails
 * @callback next when validation passes
 */
const validateNewUser = (request, response, next) => {
  const { error } = Joi.validate(request.body, newUserSchema, {
    abortEarly: false,
    language: {
      key: '{{key}} '
    }
  });
  if (error) {
    const validationError = error.details.map(errorItem => errorItem.message);
    return errorResponse(response, 422, validationError);
  }
  next();
};

export default validateNewUser;
