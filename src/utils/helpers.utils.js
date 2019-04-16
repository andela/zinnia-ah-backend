import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import models from '../db/models';

const { User } = models;

dotenv.config();

/**
 * Check User existence
 *
 * @param {String} email
 * @returns {Boolean} true if email exists
 * @returns {Boolean} false if email does not exist
 */
export const getUserbyEmail = async email => {
  return await User.findOne({
    where: {
      email,
    },
  });
};

/**
 * Check User existence
 *
 * @param {String} username
 * @returns {Boolean} true if username exists
 * @returns {Boolean} false if username does not exist
 */
export const getUserbyUsername = async username => {
  return await User.findOne({
    where: {
      username,
    },
  });
};

/**
 * Check User duplication
 *
 * @param {String} email
 * @param {String} username
 * @returns {Boolean} true if record exists
 * @returns {Boolean} false if record does not exist
 */
export const checkDuplicateUser = async (email, username) => {
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        {
          email,
        },
        {
          username,
        },
      ],
    },
  });
  return existingUser !== null;
};

export const errorResponse = (res, statusCode, message, errors) =>
  res.status(statusCode).json({
    status: 'error',
    message,
    errors,
  });

export const successResponse = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });

/**
 *
 *
 * @export
 * @param {string} password
 * @param {number} [salt=10]
 * @returns {string} hash
 */
export async function hashPassword(password, salt = 10) {
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

/**
 *
 *
 * @export
 * @param {string} hashedPassword
 * @param {string} password
 * @returns {boolean} true/false
 */
export function comparePassword(hashedPassword, password) {
  return bcrypt.compareSync(password, hashedPassword);
}

/**
 *
 *
 * @export
 * @param {*} payload
 * @param {string} [expiresIn='30days']
 * @returns {string} token
 */
export function generateToken(payload, expiresIn = '30days') {
  const token = jwt.sign(payload, 'SECRET_KEY', {
    expiresIn,
  });
  return token;
}

export const verifyToken = async token => {
  return await jwt.verify(token, 'SECRET_KEY', (err, data) => {
    if (err) {
      return null;
    }
    return data;
  });
};

/**
 *
 *
 * @export
 * @param {array} ratings
 * @returns {array} allRatings
 */
export function calcAverageRating(ratings) {
  // get an array of only the ratings
  const allRatings = ratings.map(item => {
    return item.rating;
  });

  const averageRating =
    allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;

  return averageRating;
}
