import models from '../../db/models';
import {
  errorResponse,
  successResponse,
  getArticlebyId,
} from '../../utils/helpers.utils';

const { Highlight } = models;

/** ,
 * Highlight and Comment Part of An Article
 * @param {object} req
 * @param {object} res
 * @returns {object} highlighted article object
 */
export const createHighlight = async (req, res) => {
  const { articleId } = req.params;
  const { id: userId } = req.user;
  const { highlightedText, startIndex, stopIndex, comment } = req.body;
  const articleInContext = await getArticlebyId(articleId);

  try {
    if (!articleInContext) {
      return errorResponse(res, 404, 'This article does not exist');
    }
    const highlightThisText = await Highlight.create({
      articleId,
      userId,
      highlightedText,
      startIndex: Number(startIndex),
      stopIndex: Number(stopIndex),
      comment,
    });
    const highlightedData = {
      id: highlightThisText.id,
      highlightedText: highlightThisText.highlightedText,
      startIndex: highlightThisText.startIndex,
      stopIndex: highlightThisText.stopIndex,
      comment: highlightThisText.comment,
      articleId: highlightThisText.articleId,
    };
    return successResponse(
      res,
      201,
      'You have highlighted this text',
      highlightedData,
    );
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

/** ,
 * Get Highlights
 * @param {object} req
 * @param {object} res
 * @returns {object} highlights object
 */
export const getHighlights = async (req, res) => {
  const { articleId } = req.params;
  const { id } = req.user;

  try {
    const articleInContext = await getArticlebyId(articleId);
    if (!articleInContext) {
      return errorResponse(res, 404, 'This article does not exist');
    }
    const highlights = await Highlight.findAll({
      where: {
        articleId,
        userId: id,
      },
    });

    const highlightsData = highlights[0];
    if (!highlightsData) {
      return errorResponse(res, 404, 'You have no highlights yet!');
    }
    return successResponse(res, 200, 'Your highlights', highlights);
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};

/** ,
 * Remove Highlights
 * @param {object} req
 * @param {object} res
 * @returns {object} message
 */
export const deleteHighlights = async (req, res) => {
  const { id, articleId } = req.params;
  const { id: userId } = req.user;

  try {
    const articleInContext = await getArticlebyId(articleId);
    if (!articleInContext) {
      return errorResponse(res, 404, 'This article does not exist');
    }
    const highlight = await Highlight.findByPk(id, {
      where: {
        articleId,
        userId,
      },
    });
    await highlight.destroy();
    return successResponse(
      res,
      200,
      'You have succesfully removed your highlight',
    );
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
};
