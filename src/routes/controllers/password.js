import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../db/models';
import {
  generateToken, checkUser, errorResponse, successResponse,
} from '../utils/helpers';
import sendMailer from '../../config/mailConfig';

dotenv.config();

const secret = process.env.SECRET_KEY;
const { User } = models;

/**
   * Collect recovery email
   * @param {object} req
   * @param {object} res
   * @sends {mail} mail
   * @returns {object} token & email
   */
export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await checkUser(req, res, email);
  const token = await generateToken({ id: user.id, email }, '2h');
  const url = process.env.NODE_ENV === 'development'
    ? `${process.env.LOCAL_URL}/users/reset-passsword/${token}`
    : `${process.env.PRODUCTION_URL}/users/reset-passsword/${token}`;
  const body = {
    receivers: [`${email}`],
    subject: 'Reset Password ',
    text: '',
    html: `<p>Test mail to verify if email configuration is working</p> <a href="${url}">go here</a>`,
  };

  try {
    await sendMailer(body);
    return successResponse(res, 200, 'Email has been sent successfully', token);
  } catch (err) {
    return errorResponse(res, 500, 'Email could not be sent, please try again');
  }
}

/**
 * reset password email
 * @param {object} req
 * @param {object} res
 * @returns {object} message object
 */
export async function resetPassword(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  const hashedPassword = bcrypt.hash(password, 10);
  const user = jwt.verify(token, secret, (err, authData) => {
    if (err) {
      return res.status(401).json(err);
    }
    return authData;
  });

  try {
    await User.update(
      { passwords: hashedPassword },
      { where: { id: user.id } },
    );
    return successResponse(res, 200, 'Password successfully reset');
  } catch (err) {
    return errorResponse(res, 500, 'Password could not be reset, please try again');
  }
}
