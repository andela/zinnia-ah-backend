import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import models from '../../db/models';

const { User } = models;

dotenv.config();
const {
  SECRET_KEY,
} = process.env;

/**
 * Check Email existence
 *
 * @param {String} email fhhj
 * @returns {Boolean} true if email exists
 * @returns {Boolean} false if email does not exist
 */
export const checkEmailExistence = async (email) => {
  return await User.findOne({ where: { email } });
};

/**
 * Check Email existence to prevent duplication
 * @param {String} email email to be checked
 @ @param {String} username username to be checked
 * @param username
 * @returns {Boolean} true if record exists
 * @returns {Boolean} false if record does not exist
 */

export const checkDuplicateUser = async (email, username) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [{ email }, { username }]
    }
  });
  return existingUser !== null;
};

export const errorResponse = (res, statusCode, message, errors) => res.status(statusCode).json({
  status: 'error',
  message,
  errors
});

export const successResponse = (res, statusCode, message, data) => res.status(statusCode).json({
  status: 'success',
  message,
  data
});

export const generateToken = async (payload, time = '14d') => {
  return await jwt.sign(payload, SECRET_KEY, {
    expiresIn: time,
  });
};

export const verifyToken = async (token) => {
  return await jwt.verify(token, SECRET_KEY, (err, data) => {
    if (err) {
      return null;
    }
    return data;
  });
};

export const checkUser = async (req, res, email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      error: `User with this ${email} does not exist`,
    });
  }
  return user;
};
