import { Router } from 'express';

import { allArticles } from './controllers/articles';

const articleRouter = Router();

articleRouter.get('/', allArticles);

export default articleRouter;
