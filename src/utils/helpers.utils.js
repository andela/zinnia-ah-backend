import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import Joi from 'joi';

import models from '../db/models';

const { User, Article } = models;

dotenv.config();
const { SECRET_KEY } = process.env;

/**
 * Check Email existence
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
 * Check User existence
 *
 * @param {String} id
 * @returns {Boolean} true if username exists
 * @returns {Boolean} false if username does not exist
 */
export const getUserbyId = async id => {
  return await User.findByPk(id);
};

/**
 * Check User Account confirmation
 *
 * @param {Number} id
 * @returns {Boolean} true if user is confirmed
 * @returns {Boolean} false if email does not exist
 */
export const getConfirmedUser = async id => {
  return await User.findOne({
    where: {
      id,
      isEmailVerified: true,
    },
  });
};

/**
 * Check Article existence
 *
 * @param {String} id
 * @returns {Boolean} true if Article exists
 * @returns {Boolean} false if Article does not exist
 */
export const getArticlebyId = async id => {
  return await Article.findOne({
    where: { id },
    include: {
      model: User,
      as: 'author',
    },
  });
};

/**
 * Check Article existence
 *
 * @param {String} slug
 * @returns {Boolean} true if Article exists
 * @returns {Boolean} false if Article does not exist
 */
export const getArticlebySlug = async slug => {
  return await Article.findOne({ where: { slug } });
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
  return existingUser;
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

export const isValidUuid = async identifier => {
  const { error } = Joi.validate(identifier, Joi.string().uuid());
  if (error) {
    return false;
  }
  return true;
};
export const serverError = (res, statusCode = 500) =>
  res.status(statusCode).json({
    status: 'error',
    message:
      'Your request could not be processed at this time. Kindly try again later.',
  });
