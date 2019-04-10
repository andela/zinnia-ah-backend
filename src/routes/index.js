import { Router } from 'express';
import passport from './services/passport-strategies';
import { createUser, confirmUser, socialController } from './controllers/users';
import { forgotPassword, resetPassword } from './controllers/password';
import validateNewUser from './middlewares/validateUser';

const router = Router();

/**
 * @swagger
 * definition:
 *    default:
 *    users:
 *    profiles:
 *    articles:
 *    tags:
 */
/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: User Registration Endpoint
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
router.post('/users', validateNewUser, createUser);
router.get('/users/confirmation/:token', confirmUser);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  socialController,
);

/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: Forgot Password
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
router.post('/users/forgot-password', forgotPassword);

/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: Reset Password
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
router.patch('/users/reset-password/:token', resetPassword);

export default router;
