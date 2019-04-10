import validator from '../utils/validator.util';
import { newUserSchema, articleIdSchema } from '../../utils/validationSchema';
/**
 * Input validator for a new user account
 * @param {Object} req - request body
 * @param {Object} res - response object
 * @param {Object} next - pass control to the next handler
 * @returns {Object} Validator helper function
 */
export const validUser = (req, res, next) => {
  validator(req.body, newUserSchema, res, next);
};

export const validUuid = (req, res, next) => {
  return validator(req.params, articleIdSchema, res, next);
};
