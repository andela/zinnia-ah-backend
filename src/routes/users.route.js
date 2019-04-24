import { Router } from 'express';

import {
  getAllAuthors,
  getAuthorProfile,
  updateUserProfile,
  getReadingStats,
  getUsersReports,
  getUsersBookmarks,
} from './controllers/users.controller';

import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const userRouter = Router();

userRouter.get('/', getAllAuthors);

userRouter.put('/profile/:userId', checkAuthorizedUser, updateUserProfile);

userRouter.get('/profiles/:username', getAuthorProfile);

userRouter.get(
  '/profiles/:username/stats',
  checkAuthorizedUser,
  getReadingStats,
);

/**
 * @swagger
 *
 * /api/v1/users/reports:
 *   get:
 *     description: Get all Reports by a user
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
 *         description: reports fetched successfully
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the username was not found.
 *       5XX:
 *        description: Unexpected error.
 */
userRouter.get('/reports', checkAuthorizedUser, getUsersReports);

/**
 * @swagger
 *
 * /api/v1/users/bookmarks:
 *   get:
 *     description: Get all bookmarks by a user
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
 *         description: reports fetched successfully
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the username was not found.
 *       5XX:
 *        description: Unexpected error.
 */
userRouter.get('/bookmarks', checkAuthorizedUser, getUsersBookmarks);

export default userRouter;
