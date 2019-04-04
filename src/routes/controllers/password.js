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
    return res.status(404).json({
      error: `User with this ${email} does not exist`,
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
    return res.status(200).json({
      message: 'Email has been sent successfully',
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Email could not be sent, please try again',
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
    return res.status(200).json({
      success: 'Password successfully reset',
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Password could not be reset, please try again',
    });
  }
}
