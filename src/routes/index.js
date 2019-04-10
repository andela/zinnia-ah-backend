import { Router } from 'express';

import authRouter from './auth.route';
import passwordRouter from './password.route';
import articleRouter from './articles.route';

const router = Router();

router.use('/auth', authRouter);

router.use('/auth/users', passwordRouter);

router.use('/article', articleRouter);

export default router;
