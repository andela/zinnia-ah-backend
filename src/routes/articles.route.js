import { Router } from 'express';

import {
  createComment,
  createThreadedComment,
  editComment,
  likeComment,
} from './controllers/comments.controller.js';
import {
  getArticle,
  createArticle,
  removeArticle,
  likeAnArticle,
  unlikeAnArticle,
  shareArticleViaEmail,
  bookmarkArticle,
  removeBookmark,
  reportArticle,
} from './controllers/articles.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const articleRouter = Router();

articleRouter.post('/', createArticle);

articleRouter.delete('/:article_id', removeArticle);

articleRouter.post('/:articleId/comments', checkAuthorizedUser, createComment);

articleRouter.post(
  '/:articleId/comments/:commentId/thread',
  checkAuthorizedUser,
  createThreadedComment,
);

articleRouter.get('/:slug', getArticle);

articleRouter.post('/:articleId/like', checkAuthorizedUser, likeAnArticle);

articleRouter.post('/:articleId/unlike', checkAuthorizedUser, unlikeAnArticle);
articleRouter.post(
  '/:articleId/bookmark',
  checkAuthorizedUser,
  bookmarkArticle,
);

articleRouter.post(
  '/:articleId/removebookmark',
  checkAuthorizedUser,
  removeBookmark,
);

articleRouter.post(
  '/:articleId/comments/:commentId/like',
  checkAuthorizedUser,
  likeComment,
);

articleRouter.post('/:articleId/share', shareArticleViaEmail);

articleRouter.post(
  '/:articleId/comments/:commentId/edit',
  checkAuthorizedUser,
  editComment,
);

articleRouter.post('/:articleId/report', checkAuthorizedUser, reportArticle);

export default articleRouter;
