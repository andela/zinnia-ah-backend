import {
  generateToken, errorResponse, verifyToken, successResponse, checkDuplicateUser,
} from '../utils/helpers';
import models from '../../db/models';
import sendMailer from '../../config/mailConfig';

const { User } = models;

/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
export const createUser = async (req, res) => {
  const { email, username } = req.body;
  const isDuplicate = await checkDuplicateUser(email, username);
  if (isDuplicate) {
    return errorResponse(res, 409, 'validation error', 'Username/Email in use already');
  }
  try {
    const user = await User.create(req.body);
    const tokenPayload = { id: user.id, email: user.email };
    const token = await generateToken(tokenPayload);
    const url = process.env.NODE_ENV === 'test' ? `${process.env.LOCAL_URL}/${token}` : `${process.env.PRODUCTION_URL}/${token}`;
    const emailDetails = {
      receivers: [`${user.email}`],
      subject: 'Verification email',
      text: '',
      html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
    };
    sendMailer(emailDetails);
    return successResponse(res, 201, 'You have successfully registered however you would need to check your mail to verify your account', [{ token }]);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

export const confirmUser = async (req, res) => {
  try {
    const decoded = await verifyToken(req.params.token);
    const { id } = decoded;
    const response = await User.update(
      { isEmailVerified: true },
      { returning: true, where: { id } },
    );
    const responseData = {
      confirmed: response[1][0].isEmailVerified,
    };
    return successResponse(res, 200, 'Your account has been verified', responseData);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
}

/**
  * Update user profile.
  * @param {object} req
  * @param {object} res
  * @returns {object} user object
  */
export const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const userProfile = await User.findByPk(userId);
  const {
    firstName, lastName, username, bio, imageUrl
  } = req.body;
  try {
    const resultData = await userProfile.update({
      firstName: firstName || userProfile.firstName,
      lastName: lastName || userProfile.lastName,
      username: username || userProfile.username,
      bio: bio || userProfile.bio,
      imageUrl: imageUrl || userProfile.imageUrl
    });
    const profile = {
      firstName: resultData.firstName,
      lastName: resultData.lastName,
      username: resultData.username,
      bio: resultData.bio,
      imageUrl: resultData.imageUrl,
    };
    return successResponse(res, 200, 'Your profile has been updated succesfully', profile);
  } catch (err) {
    return errorResponse(res, 400, err.message);
  }
}

/**
    * Get current User
    * @constructor
    * @param {object} req
    * @param {object} res
    * @param {uuid} userId - The uuid variable.
    */
export async function getUser(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne(
      {
      where: { username},
      attributes: ['username', 'firstName', 'lastName', 'bio', 'imageUrl'],
      })
      if (!user) {
        return errorResponse(res, 404, 'The username provided does not exist');
      }
    return successResponse(res, 200, 'Your requested profile', user);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}
