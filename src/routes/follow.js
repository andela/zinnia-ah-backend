import { Router } from 'express';
import follow from './controllers/follow';

const followRouter = Router();

/**
 * @swagger
 * definition:
 *    follow:
 */

/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: Follow User
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: User followed
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified username was not found.
 *       5XX:
 *        description: Unexpected error.
 */
followRouter.post('/:username/follow/:userId', follow);

/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: Un-follow User
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: User un-followed
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified username was not found.
 *       5XX:
 *        description: Unexpected error.
 */
followRouter.delete('/:username/unfollow/:userId', follow);

export default followRouter;
