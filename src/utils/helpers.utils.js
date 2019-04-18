import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
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
  return await User.findByPk({ where: { id } });
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
      as: 'user',
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

export const checkUser = async (req, res, email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      error: `User with this ${email} does not exist`,
    });
  }
  return user;
};

export const isValidUser = async (req, res, next) => {
  try {
    const decodedToken = await verifyToken(
      req.headers['x-access-token'] || req.headers.authorization,
    );
    req.userid = decodedToken.id;
    return next();
  } catch (err) {
    return errorResponse(res, 401, 'unauthorized users');
  }
};

export const isArticleExist = async articleId => {
  const getArticle = await Article.findOne({
    where: { articleId },
  });
  if (getArticle) return getArticle;
  return 'article does not exist';
};
/**
 *
 *
 * @export
 * @param {array} ratings
 * @returns {number} averageRating
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
