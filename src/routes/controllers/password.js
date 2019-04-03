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
const Password = {
/**
   * Collect recovery email
   * @param {object} req
   * @param {object} res
   * @sends {mail} mail
   * @returns {object} email
   */
  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const checkUser = await User.findOne({
        where: { email },
      });
      if (!checkUser) {
        message = { body: `User with this ${email} does not exist` };
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
      await sendMailer(body);
      message = 'Email has been sent successfully';
      return res.status(200).json({
        success: message,
        token,
      });
    } catch (err) {
      throw err;
    }
  },

  async resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    const hashedPassword = bcrypt.hash(password, 10);
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'Token not available',
      });
    }
    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        return res.status(401).json(err);
      }
      req.authData = authData;
    });

    try {
      const updatedPassword = await User.update(
        { passwords: hashedPassword },
        { where: { id: req.authData.id } },
      );
      if (!updatedPassword) {
        message = 'Password could not be reset';
        return res.status(500).json({
          error: message,
        });
      }
      message = 'Password successfully reset';
      return res.status(200).json({
        success: message,
      });
    } catch (err) {
      throw err;
    }
  }
};
export default Password;
