/* eslint-disable require-jsdoc */
import bcrypt from 'bcryptjs';

import models from '../../db/models';
import {
  generateToken,
  getUserbyEmail,
  errorResponse,
  successResponse,
  verifyToken,
} from '../../utils/helpers.utils';
import { sendMailer } from '../../config/mail-config';
import mailTemplate from '../../utils/mail-template/mail-template.utils';

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
  const user = await getUserbyEmail(email);
  if (!user) {
    return errorResponse(res, 404, 'User does not exist', true);
  }
  const token = await generateToken(
    {
      id: user.id,
      email,
    },
    '2h',
  );
  const url =
    process.env.NODE_ENV === 'development'
      ? `${process.env.LOCAL_URL}/users/reset-password?token=${token}`
      : `${process.env.PRODUCTION_URL}/users/reset-password?token=${token}`;
  const emailBody = {
    content: `This mail is sent to you because you requested a password reset. <a href="${url}">Go here</a>  to reset your password.`,
    title: 'Reset Password',
  };
  const body = {
    receivers: [`${email}`],
    subject: emailBody.content,
    text: '',
    html: mailTemplate(emailBody),
  };

  try {
    await sendMailer(body);
    return successResponse(res, 200, 'Email has been sent successfully', {
      token,
    });
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
  const user = await verifyToken(token);
  if (user === null) {
    return errorResponse(res, 400, 'Token Malformed', true);
  }

  try {
    await User.update(
      {
        passwords: hashedPassword,
      },
      {
        where: {
          id: user.id,
        },
      },
    );
    return successResponse(res, 200, 'Password successfully reset');
  } catch (err) {
    return errorResponse(
      res,
      500,
      'Password could not be reset, please try again',
    );
  }
}
