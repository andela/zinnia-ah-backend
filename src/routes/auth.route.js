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

authRouter.post('/signup', validateNewUser, signup);
authRouter.get('/users/confirmation/:token', confirmUser);

authRouter.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
);

authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
  }),
  socialController,
);

authRouter.post('/login', login);

export default authRouter;
