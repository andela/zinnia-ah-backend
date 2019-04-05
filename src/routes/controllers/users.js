import { generateToken, errorResponse, successResponse, checkDuplicateUser } from '../utils/helpers';
import models from '../../db/models';

const { User } = models;

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
const createUser = async (req, res) => {
  const { email, username } = req.body;
  const isDuplicate = await checkDuplicateUser(email, username);
  if (isDuplicate) {
    return errorResponse(res, 409, 'validation error', 'Username/Email in use already');
  }
  try {
    const user = await User.create(req.body);
    const tokenPayload = { id: user.id, email: user.email };
    const token = await generateToken(tokenPayload);
    return successResponse(res, 201, 'You have successfully registered however you would need to check your mail to verify your account', [{ token }]);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
export default createUser;
