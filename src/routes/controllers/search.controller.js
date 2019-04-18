import { Op } from 'sequelize';

import { errorResponse, successResponse } from '../../utils/helpers.utils';
import models from '../../db/models';

const { User, Article, Tag } = models;

/**
 * perform custom search sitewide
 *
 * @param {Object} req Express request
 * @param {Object} res Express object
 * @returns {Array} articles, authors and tags
 */
export default async function customSearch(req, res) {
  const { keyword } = req.query;

  if (!keyword) {
    return errorResponse(res, 400, 'Please input a search parameter');
  }

  try {
    const articleAttributes = [
      'title',
      'description',
      'body',
      'status',
      'readTime',
    ];

    const userAttributes = ['username', 'firstName', 'lastName', 'image'];

    const tagAttributes = ['name'];

    const articles = await Article.findAll({
      attributes: articleAttributes,
      where: {
        title: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    const authors = await User.findAll({
      attributes: userAttributes,
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
          {
            lastName: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
          {
            username: {
              [Op.iLike]: `%${keyword}%`,
            },
          },
        ],
      },
    });

    const tags = await Tag.findAll({
      attributes: tagAttributes,
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
    });

    return successResponse(res, 200, 'matches found', {
      keyword,
      articles,
      authors,
      tags,
    });
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}
