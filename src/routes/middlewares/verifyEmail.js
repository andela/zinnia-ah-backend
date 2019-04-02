import models from '../../db/models';
import { errorResponse, successResponse } from '../../utils/apiResponse';

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
const emailExistence = async (req, res, next) => {
  const { email, username, password } = req.body;
  const existingUser = await User.findOne({
    where: {
      email
    }
  });
  if (existingUser) {
    return errorResponse(res, 422, 'A user account with this email exists already');
  }
  const newUser = await User.create({ email, username, password });
  return successResponse(res, 201, 'User created successfully', newUser);
};

export default emailExistence;
