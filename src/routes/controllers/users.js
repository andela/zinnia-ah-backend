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
    * @constructor
    * @param {object} req
    * @param {object} res
    * @returns {object} user object
    */

  export const updateUserProfile = async (req, res) => {
    try {
      const userProfile = await User.findByPk(req.decoded.id);
      const {
        firstName, lastName, username, bio, imageUrl
      } = req.body;
      const resultData = await userProfile.update({
        firstName: firstName || userProfile.firstName,
        lastName: lastName || userProfile.lastName,
        username: username || userProfile.username,
        bio: bio || userProfile.bio,
        imageUrl: imageUrl || userProfile.imageUrl
      });
      const resultObject = {
        firstName: resultData.firstName,
        lastName: resultData.lastName,
        username: resultData.username,
        bio: resultData.bio,
        imageUrl: resultData.imageUrl,
      };
      return res.status(204).json({
        status: 204,
        message: 'Your profile has been updated succesfully',
        resultObject,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err
      });
    }
  }

