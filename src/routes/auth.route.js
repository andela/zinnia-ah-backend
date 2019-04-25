import { Router } from 'express';

import { validateNewUser } from './middlewares/validate-input.middleware';
import passport from './services/passport-strategies.services';
import {
  signup,
  confirmUser,
  socialController,
  login,
} from './controllers/auth.controller';

const authRouter = Router();

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
authRouter.post('/signup', validateNewUser, signup);
authRouter.get('/users/confirmation/:token', confirmUser);

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
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
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
  passport.authenticate('facebook', {
    session: false,
  }),
  socialController,
);

/**
 * @swagger
 *
 * /api/v1/auth/twitter/callback:
 *   get:
 *     description: User Registration Via Twitter
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
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  socialController,
);

/**
 * @swagger
 *
 * /api/v1/auth/twitter/callback:
 *   get:
 *     description: User Registration Via Twitter
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
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  socialController,
);

/**
 * @swagger
 *
 * /api/v1/auth/twitter/callback:
 *   get:
 *     description: User Registration Via Twitter
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
authRouter.get('/twitter', passport.authenticate('twitter'));
authRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter', { session: false }),
  socialController,
);

/**
 * @swagger
 *
 * /api/v1/users/login:
 *   post:
 *     description: User login
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
 *         description: Login successful
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
authRouter.post('/login', login);

export default authRouter;
