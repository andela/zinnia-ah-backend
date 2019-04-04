import { generateToken, errorResponse, successResponse, } from '../utils/helpers';
import models from '../../db/models';

const { User } = models;
/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const tokenPayload = { id: user.id, email: user.email };
    const token = await generateToken(tokenPayload);
    return successResponse(res, 201, 'You have successfully registered however you would need to check your mail to verify your account', [{ token }]);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

/**
 * Redirect location after social login
 * @param {object} req
 * @param {object} res
 * @returns {object} response object
 */
export const socialController = async (req, res) => {
  const user = req.user[0];
  const isCreated = req.user[1];

  try {
    const tokenPayload = { id: user.id, email: user.email };
    const token = await generateToken(tokenPayload);
    if (isCreated) {
      return successResponse(res, 201, 'You have successfully registered however you would need to check your mail to verify your account', [{ token }]);
    }
    return successResponse(res, 200, 'You are now logged in', [{ token }]);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

export default createUser;
