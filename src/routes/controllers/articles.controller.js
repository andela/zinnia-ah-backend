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
export async function createArticle(req, res) {
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

    const createdArticle = await Article.create({
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
      createdArticle,
    );
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
}

/**
 * Fetch a single article
 * @param {Object} req Express Request Object
 * @param {Object} res Express Response Object
 * @returns {Object} res with article object if it exists
 * @returns {Object} res with 404 response if the array is empty
 */
export async function getArticle(req, res) {
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
    return errorResponse(res, 500, 'An error occured', error.message);
  }
}
export const rateArticle = async (req, res) => {
  const { rating } = req.body;
  const { articleId } = req.params;
  const userId = req.user.id;

  return errorResponse(res, 400, 'Nothing happened');
};
