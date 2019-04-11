import crypto from 'crypto';
import slug from 'slug';
import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  verifyToken,
} from '../../utils/helpers.utils';

const { Article, User } = models;

/**
 * passes new article to be created to the model
 * @param {object} req
 * @param {object} res
 * @returns {object} article creation error/success message.
 */
export async function create(req, res) {
  const { title, description, body, images, tags } = req.body;
  if (!title || !description || !body) {
    return errorResponse(
      res,
      422,
      'invalid/empty input. all fields must be specified.',
    );
  }
  try {
    const userInfo = await verifyToken(
      req.headers['x-access-token'] || req.headers.authorization,
    );
    if (!userInfo) {
      throw Error('jwt must be provided');
    }

    const createArticle = await Article.create({
      userId: userInfo.id,
      title,
      slug: slug(
        `${title}-${crypto.randomBytes(12).toString('base64')}`,
      ).toLowerCase(),
      description,
      body,
      imageList: images,
      tagList: tags,
      readTime: '30 min',
      subscriptionType: 'free',
      status: 'draft',
    });
    return successResponse(
      res,
      201,
      'your article has been created successfully',
      createArticle,
    );
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
}

/**
 * Fetch all articles
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with articles array if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function getAll(req, res) {
  const currentPage = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = limit * (currentPage - 1);

  try {
    const articles = await Article.findAndCountAll({
      attributes: {
        exclude: ['id', 'userId', 'subcriptionType', 'readTime'],
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'username'],
        },
      ],
      limit,
      offset,
    });

    if (articles.rows.length) {
      return successResponse(
        res,
        200,
        'Articles successfully retrieved',
        articles,
      );
    }

    return errorResponse(res, 404, 'No Articles found');
  } catch (error) {
    return errorResponse(res, 400, 'An error occured', error);
  }
}

/**
 * Fetch a single article
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with article object if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function findArticle(req, res) {
  const { articleId } = req.params;

  try {
    const article = await Article.findByPk(articleId, {
      attributes: {
        exclude: ['id', 'userId', 'subcriptionType', 'readTime'],
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['firstName', 'lastName', 'username'],
        },
      ],
    });

    if (article) {
      return successResponse(
        res,
        200,
        'Article successfully retrieved',
        article,
      );
    }

    return errorResponse(res, 404, 'Article does not exist');
  } catch (error) {
    return errorResponse(res, 400, 'An error occured', error);
  }
}
