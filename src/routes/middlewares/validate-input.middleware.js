import Joi from 'joi';

import { errorResponse } from '../../utils/helpers.utils';

/**
 * validator for request Query
 * @param {Object} schema - validation schema
 * @param {Object} res - Express response object
 * @param {Object} next - pass control to the next handler
 * @returns {Object} Error Response if validation fails
 */
export const validateReqQuery = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.query, schema, {
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
};

/**
 * validator for request Params
 * @param {Object} schema - validation schema
 * @param {Object} res - Express response object
 * @param {Object} next - pass control to the next handler
 * @returns {Object} Error Response if validation fails
 */
export const validateReqParams = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.params, schema, {
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
};

/**
 * validator for request Body
 * @param {Object} schema - validation schema
 * @param {Object} res - Express response object
 * @param {Object} next - pass control to the next handler
 * @returns {Object} Error Response if validation fails
 */
export const validateReqBody = schema => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema, {
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
};

export const validateRating = (req, res, next) => {
  return validator(req.body, ratingSchema, res, next);
};
