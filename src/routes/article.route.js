import { Router } from 'express';

import { allArticles, findArticle } from './controllers/articles';
import { validUuid } from './middlewares/validateInput';
const articleRouter = Router();

articleRouter.get('/', allArticles);
articleRouter.get('/:articleId', validUuid, findArticle);

export default articleRouter;
