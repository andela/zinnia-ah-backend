import { errorResponse, successResponse } from '../../utils/helpers.utils';
import { articleFilter, authorsFilter } from '../../utils/database.utils';

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
    const articles = await articleFilter(keyword);

    const authors = await authorsFilter(keyword);

    return successResponse(res, 200, 'matches found', {
      keyword,
      articles,
      authors,
    });
  } catch (error) {
    return errorResponse(res, 500, 'database error', error.message);
  }
}
