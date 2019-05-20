import { Router } from 'express';

import customSearch from './controllers/search.controller';
import { getArticleTag } from './controllers/tags.controller';

const searchRouter = Router();

/**
 * @swagger
 * definition:
 *    search and filter:
 */

/**
 * @swagger
 *
 * /api/v1/search:
 *   get:
 *     description: perform a site wide search
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/search'
 *     responses:
 *       200:
 *         description: matches found
 *       400:
 *         description: Bad request
 *       404:
 *        description: No match found.
 *       5XX:
 *        description: Unexpected error.
 */

searchRouter.get('/', customSearch);

/**
 * @swagger
 * definition:
 *    search a tag:
 */

/**
 * @swagger
 *
 * /api/v1/search/tags:
 *   get:
 *     description: search for articles attached to a tag
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/search'
 *     responses:
 *       200:
 *         description: matches found
 *       400:
 *         description: Bad request
 *       404:
 *        description: No match found
 *       5XX:
 *        description: Unexpected error.
 */

searchRouter.get('/tags/:tag', getArticleTag);

export default searchRouter;
