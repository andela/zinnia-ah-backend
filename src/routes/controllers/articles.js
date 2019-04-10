import models from '../../db/models';
import { successResponse, errorResponse } from '../utils/helpers';

const { Article, User } = models;

/**
 * Fetch all articles
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with articles array if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function allArticles(req, res) {
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
