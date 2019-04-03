import { Router } from 'express';

import authRouter from './auth.route';
import passwordRouter from './password.route';
import articleRouter from './articles.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/auth/users', passwordRouter);

router.use('/article', articleRouter);

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

export default router;
