import { Router } from 'express';

import authRouter from './auth.route';
import passwordRouter from './password.route';
import articleRouter from './articles.route';
import followRouter from './follow.route';
import userRouter from './users.route';
import rolesRouter from './roles.route';
import highlightRouter from './highlights.route';
import searchRouter from './search.route';
import rolesRouter from './roles.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/auth/users', passwordRouter);

router.use('/users/roles', rolesRouter);

router.use('/articles', articleRouter);

router.use('/users', userRouter);

router.use('/profiles', userRouter);

router.use('/profiles', followRouter);

router.use('/articles', highlightRouter);

router.use('/search', searchRouter);

export default router;
