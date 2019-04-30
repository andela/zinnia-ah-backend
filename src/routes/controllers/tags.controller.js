import sequelize from '../../../.sequelizerc';
import models from '../../db/models';
import {
  successResponse,
  errorResponse,
  verifyToken,
} from '../../utils/helpers.utils';

const { ArticleTags, Tag } = models;

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
