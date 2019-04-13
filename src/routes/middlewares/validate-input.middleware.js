import validator from '../../utils/validator.utils';
import {
  newUserSchema,
  articleIdSchema,
  ratingSchema,
} from '../../utils/validation-schema.utils';
/**
 * Input validator for a new user account
 * @param {Object} req - request body
 * @param {Object} res - response object
 * @param {Object} next - pass control to the next handler
 * @returns {Object} Validator helper function
 */
export const validateNewUser = (req, res, next) => {
  validator(req.body, newUserSchema, res, next);
};

export const validateUuid = (req, res, next) => {
  return validator(req.params, articleIdSchema, res, next);
};

export const validateRating = (req, res, next) => {
  return validator(req.body, ratingSchema, res, next);
};
