import { Op } from 'sequelize';
import models from '../../db/models';
import { errorResponse } from '../../utils/apiResponse';

const { User } = models;

/**
 * Check Email existence to prevent duplication
 *
 * @param {Object} req Express Request object
 * @param {Object} res Express Response object
 * @param {Object} next callback function
 * @returns {Object} Error Response if validation fails
 * @callback next pass control to the next function
 */
export const preventAccountDuplication = async (req, res, next) => {
  const { email, username } = req.body;
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }]
    }
  });
  if (existingUser) {
    if (existingUser.email === email) {
      return errorResponse(res, 409, 'This email is already taken');
    }
    return errorResponse(res, 409, 'This username is already taken');
  }
  next();
};

/**
 * Check Email existence to before proceeding
 *
 * @param {Object} req Express Request object
 * @param {Object} res Express Response object
 * @param {Object} next callback function
 * @returns {Object} Error Response if validation fails
 * attach the existing user to the request header
 * @callback next pass control to the next function
 */
export const checkEmailExistence = async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    return errorResponse(res, 404, 'User does not exist');
  }
  req.authData = existingUser;
  next();
};
