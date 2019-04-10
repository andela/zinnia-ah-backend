import { Router } from 'express';
import passport from './services/passport-strategies';
import { socialController } from './controllers/users';

const authRouter = Router();

/**
 * @swagger
 *
 * /api/v1/auth/facebook:
 *   get:
 *     tags:
 *        - auth
 *     description: User Registration Via Facebook
 *     produces:
 *       - application/json
 *     request:
 *         $ref: '#/definitions/auth'
 *     responses:
 *       201:
 *         description: User created
 *       200:
 *         description: Existing user is now logged in
 *       400:
 *         description: Bad request.
 *       5XX:
 *        description: Unexpected error.
 */
authRouter.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] }),
);

/**
 * @swagger
 *
 * /api/v1/auth/facebook/callback:
 *   get:
 *     description: User Registration Via Facebook
 *     produces:
 *       - application/json
 *     request:
 *         $ref: '#/definitions/auth'
 *     responses:
 *       201:
 *         description: User created
 *       200:
 *         description: Existing user is now logged in
 *       400:
 *         description: Bad request.
 *       5XX:
 *        description: Unexpected error.
 */
authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  socialController,
);

export default authRouter;
