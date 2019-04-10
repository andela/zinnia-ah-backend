import crypto from 'crypto';
import slug from 'slug';
import models from '../../db/models';
import { successResponse, errorResponse, verifyToken } from '../utils/helpers';

const { Article } = models;

/**
 * passes new article to be created to the model
 * @param {object} req
 * @param {object} res
 * @returns {object} article creation error/success message.
 */
export default async function create(req, res) {
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
      subcriptionType: 'free',
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
