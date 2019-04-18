import { Router } from 'express';

import customSearch from './controllers/search.controller';

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
 *         description: matches fond
 *       400:
 *         description: Bad request
 *       404:
 *        description: A user with the specified username was not found.
 *       5XX:
 *        description: Unexpected error.
 */

searchRouter.get('/', customSearch);

export default searchRouter;
