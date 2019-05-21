import { Router } from 'express';
import { follow, unfollow } from './controllers/follow.controller';
import { checkAuthorizedUser } from './middlewares/authorized-user.middleware';

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
 *       200:
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
followRouter.post('/:username/follow', checkAuthorizedUser, follow);

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
 *       200:
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
followRouter.delete('/:username/unfollow/', checkAuthorizedUser, unfollow);

export default followRouter;
