import { Router } from 'express';

import { getAllAuthors, getAuthorProfile } from './controllers/auth.controller';
import { verifyToken } from '../utils/helpers.utils';

const userRouter = Router();

/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: Get all authors
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
 *         description: User created
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
userRouter.get('/', verifyToken, getAllAuthors);

/**
 * @swagger
 *
 * /api/v1/profiles/:username:
 *   post:
 *     description: View user's profile
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
 *         description: User created
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
userRouter.get('/:username', verifyToken, getAuthorProfile);

export default userRouter;
