import models from '../../db/models';
import { successResponse, errorResponse } from '../utils/helpers';

const { Article } = models;

/**
 * @ArticlesController
 * @description Handles all CRUD actions for articles
 */
class ArticleController {
  /**
   * Fetch all articles
   * @param {Object} req Express Request Object
   * @param {Object} res Express Response Object
   * @returns {Object} res with articles array if it exists
   * @returns {Object} res with 404 response if the array is empty
   */
  static async all(req, res) {
    try {
      const articles = await Article.findAll();
      if (articles.length > 0) {
        return successResponse(res, 200, 'resource found', articles);
      }
      return errorResponse(res, 404, 'resource not found');
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: 'An unknown error occured',
        errors: error,
      });
    }
  }
}

export default ArticleController;
