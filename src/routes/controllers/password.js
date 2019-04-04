import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import models from '../../db/models';
import sendMailer from '../../config/mailConfig';

dotenv.config();

const { User } = models;
const secret = process.env.SECRET_KEY;
const expires = { expiresIn: '2h' };
const generateToken = payload => jwt.sign(payload, secret, expires);
let message;
/**
   * Collect recovery email
   * @param {object} req
   * @param {object} res
   * @sends {mail} mail
   * @returns {object} token & email
   */
export async function forgotPassword(req, res) {
  const { email } = req.body;
  const checkUser = await User.findOne({ where: { email } });
  if (!checkUser) {
    message = `User with this ${email} does not exist`;
    return res.status(404).json({
      error: message,
    });
  }
  const token = generateToken({ id: checkUser.id, email });
  const url = process.env.NODE_ENV === 'development' ? `http:localhost:3000/api/v1/reset-password?token=${token}`
    : `https://zinnia-ah-backend-staging.herokuapp.com/api/v1/reset-password?token=${token}`;
  const body = {
    receivers: [`${email}`],
    subject: 'Reset Password ',
    text: '',
    html: `<p>Test mail to verify if email configuration is working</p> <a href="${url}">go here</a>`,
  };

  try {
    await sendMailer(body);
    message = 'Email has been sent successfully';
    return res.status(200).json({
      message,
      token,
    });
  } catch (err) {
    message = 'Email could not be sent, please try again';
    return res.status(500).json({
      error: message,
    });
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
  jwt.verify(token, secret, (err, authData) => {
    if (err) {
      return res.status(401).json(err);
    }
    req.authData = authData;
  });

  try {
    await User.update(
      { passwords: hashedPassword },
      { where: { id: req.authData.id } },
    );
    message = 'Password successfully reset';
    return res.status(200).json({
      success: message,
    });
  } catch (err) {
    message = 'Password could not be reset, please try again';
    return res.status(500).json({
      error: message,
    });
  }
}
