import { Router } from 'express';
import articleController from './controllers/articles';

const ArticleRouter = Router();

ArticleRouter.get('/articles', articleController.all);

export default ArticleRouter;
