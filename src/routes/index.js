/* eslint-disable require-jsdoc */
import {
  Router
} from 'express';

import authRouter from './auth.route';
import passwordRouter from './password.route';
import articleRouter from './articles.route';
import followRouter from './follow.route';
import userRouter from './users.route';
import commentsRouter from './comments.route';

const router = Router();

router.use('/auth', authRouter);
router.use('/auth/users', passwordRouter);

router.use('/articles', articleRouter);

router.use('/users', userRouter);

router.use('/profiles', followRouter);
router.use('/users', userRouter);

export default router;
