import { Op } from 'sequelize';
import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  serverError,
} from '../../utils/helpers.utils';

const { ArticleTags, Tag, Article } = models;

/**
 * @description create tag for an article
 * @param {*} tags
 * @param {*} articleId
 * @returns {boolean} response
 */
export async function createTag(tags, articleId) {
  if (!Array.isArray(tags)) return null;
  let createdTag = [];
  for (let tag of tags) {
    const response = await processTags(tag.toLowerCase(), articleId);
    if (response.status === 'error') return response.message;
    createdTag.push(response.message);
  }
  return createdTag;
}

/**
 * @description update tag for an article
 * @param {*} tags
 * @param {*} articleid
 * @returns {boolean} response
 */
export async function updateTag(tags, articleid) {
  try {
    if (!Array.isArray(tags)) return null;
    for (let tag of tags) {
      const removedTag = await removeTag(articleid);
      if (removedTag.status !== 'deleted') throw new Error(removedTag.message);
    }
    const createdTag = await createTag(tags, articleid);
    return createdTag;
  } catch (error) {
    return error.message;
  }
}

/**
 * @description delete a tag from article
 * @param {string} articleId
 * @returns {boolean} response
 */
export async function removeTag(articleId) {
  try {
    const deletedTag = await ArticleTags.destroy({
      where: { articleId },
    });
    return { status: 'deleted' };
  } catch (error) {
    return error.message;
  }
}

/**
 * @description list tag
 * @param {object} req
 * @param {object} res
 * @returns {boolean} response
 */
export async function viewTags(req, res) {
  try {
    const tagArticle = await ArticleTags.findAll();
    return { status: 'success', message: tagArticle };
  } catch (error) {
    return { status: 'error', error };
  }
}

/**
 * @description find tag
 * @param {object} req
 * @param {object} res
 * @returns {Object} tag and articles
 */
export async function getArticleTag(req, res) {
  const { tag } = req.params;

  try {
    const tagAndArticles = await Tag.findOne({
      where: { name: tag },
      include: {
        model: Article,
        as: 'articles',
        attributes: ['title', 'description', 'imageThumbnail', 'slug'],
      },
    });

    if (tagAndArticles) {
      return successResponse(res, 200, '', tagAndArticles);
    }
    return errorResponse(res, 404, 'Tag not found');
  } catch (error) {
    return serverError(res);
  }
}

/**
 * process tags to be created
 * @param {array} tag
 * @param {string} articleId
 * @returns {object} response object
 */
const processTags = async (tag, articleId) => {
  try {
    const createdTag = await Tag.findOrCreate({
      where: { name: tag },
    });

    const tagArticle = await ArticleTags.findOrCreate({
      where: { tagId: createdTag[0].id, articleId },
    });
    return { status: 'success', message: tag };
  } catch (error) {
    if (
      error.message.includes('invalid input syntax') ||
      error.message.includes('foreign')
    ) {
      return { status: 'error', message: 'invalid article id' };
    }
    return { status: 'error', message: error };
  }
};

/**
 * @description list tag
 * @param {object} req
 * @param {object} res
 * @returns {boolean} tags array
 */
export async function getAllTags(req, res) {
  try {
    const tags = await Tag.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    return successResponse(res, 200, 'Successful', tags);
  } catch (error) {
    return serverError(res);
  }
}
