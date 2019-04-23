import { Router } from 'express';

import {
  validateUuid,
  validateRating,
} from './middlewares/validate-input.middleware';
import {
  createComment,
  createThreadedComment,
  editComment,
  likeComment,
} from './controllers/comments.controller.js';
import {
  getSingleArticle,
  getAllArticles,
  createArticle,
  removeArticle,
  likeAnArticle,
  unlikeAnArticle,
  shareArticleViaEmail,
  bookmarkArticle,
  removeBookmark,
  reportArticle,
  rateArticle,
} from './controllers/articles.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const articleRouter = Router();

/**
 * @swagger
 *
 * /api/v1/articles:
 *   delete:
 *     tags:
 *       - article
 *     description: users can delete an article on authors haven.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: the title of the article.
 *         in: body
 *         required: true
 *       - name: description
 *         description: the summary of the article.
 *         in: body
 *         required: true
 *       - name: body
 *         description: the content of the article.
 *         in: body
 *         required: true
 *       - name: images
 *         description: url to all images in the articles. {string} separated with a comma.
 *         in: body
 *       - name: tags
 *         description: the tag list.
 *         in: body
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: article deleted
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: ran
 */
articleRouter.delete('/:article_id', removeArticle);

/**
 * @swagger
 *
 * /api/v1/articles:
 *   post:
 *     tags:
 *       - article
 *     description: users can create an article on authors haven.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: the title of the article.
 *         in: body
 *         required: true
 *       - name: description
 *         description: the summary of the article.
 *         in: body
 *         required: true
 *       - name: body
 *         description: the content of the article.
 *         in: body
 *         required: true
 *       - name: images
 *         description: url to all images in the articles. {string} separated with a comma.
 *         in: body
 *       - name: tags
 *         description: the tag list.
 *         in: body
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: article created
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: ran
 */
articleRouter.post('/', createArticle);

/**
 * @swagger
 *
 * /:slug/comments:
 *   post:
 *     description: Reset Password
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
 *         description: Comment created
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
articleRouter.post('/:articleId/comments', checkAuthorizedUser, createComment);

/**
 * @swagger
 *
 * /:slug/comments/:commentId/thread:
 *   post:
 *     description: Reset Password
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
 *         description: Comment created
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
articleRouter.post(
  '/:articleId/comments/:commentId/thread',
  checkAuthorizedUser,
  createThreadedComment,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId:
 *   get:
 *     tags:
 *       - article
 *     description: users can fetch a single article using article Id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: the slug or uuid of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article fetched
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.get('/:articleId', getSingleArticle);

/**
 * @swagger
 *
 * /api/v1/articles:
 *   get:
 *     tags:
 *       - article
 *     description: users can fetch all articles and paginate them.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: the number of articles per page
 *         in: query
 *         required: false
 *       - name: page
 *         description: the page number to fetch articles from
 *         in: query
 *         required: false
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: articles fetched
 *       500:
 *         description: Database error
 */
articleRouter.get('/', getAllArticles);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/like:
 *   post:
 *     tags:
 *       - article
 *     description: users can like an article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: article liked
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post(
  '/:articleId/like',
  validateUuid,
  checkAuthorizedUser,
  likeAnArticle,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/unlike:
 *   post:
 *     tags:
 *       - article
 *     description: users can like an article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: article liked
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post(
  '/:articleId/unlike',
  validateUuid,
  checkAuthorizedUser,
  unlikeAnArticle,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/bookmark:
 *   post:
 *     tags:
 *       - article
 *     description: users can bookmark an article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: article bookmarked
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post(
  '/:articleId/bookmark',
  validateUuid,
  checkAuthorizedUser,
  bookmarkArticle,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/removebookmark:
 *   post:
 *     tags:
 *       - article
 *     description: users can remove a bookmarked article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: article bookmark successfully removed
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post(
  '/:articleId/removebookmark',
  validateUuid,
  checkAuthorizedUser,
  removeBookmark,
);

/**
 * @swagger
 *
 * /api/v1/article/:articleId/rate:
 *   post:
 *     tags:
 *       - article
 *     description: users can rate a single article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: the id of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article rated
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.post(
  '/:articleId/rate',
  checkAuthorizedUser,
  validateRating,
  rateArticle,
);

/**
 * @swagger
 *
 * /api/v1/article/:articleId/like:
 *   post:
 *     tags:
 *       - article
 *     description: users can like a comment.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: comment liked
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post(
  '/:articleId/comments/:commentId/like',
  checkAuthorizedUser,
  likeComment,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/share:
 *   post:
 *     tags:
 *       - article
 *     description: users can share a single article via email.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: the id of the article.
 *         in: params
 *         required: true
 *
 *         $ref: '#/definitions/articles'
 *     responses:
 *       200:
 *         description: articles fetched
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post('/:articleId/share', shareArticleViaEmail);

/**
 * @swagger
 *
 * /api/v1/articles:
 *   get:
 *     tags:
 *       - articles
 *     description: users fetch articles and paginate them.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         description: the page to fetch from
 *         required: false
 *       - name: limit
 *         description: the number of rows to return
 *         in: params
 *         required: false
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article fetched
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.get('/', getAllArticles);

/**
 * @swagger
 *
 * /api/v1/article/:articleId/rate:
 *   post:
 *     tags:
 *       - article
 *     description: users can rate a single article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: the id of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article rated
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.post(
  '/:articleId/rate',
  checkAuthorizedUser,
  validateRating,
  rateArticle,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/comments/:commentId/edit:
 *   post:
 *     tags:
 *       - article
 *     description: users can edit a comment.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article fetched
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.post(
  '/:articleId/comments/:commentId/edit',
  checkAuthorizedUser,
  editComment,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/rate:
 *   post:
 *     tags:
 *       - article
 *     description: users can rate a single article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: the id of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article rated
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.post(
  '/:articleId/rate',
  validateUuid,
  validateRating,
  checkAuthorizedUser,
  rateArticle,
);

/**
 * @swagger
 *
 * /api/v1/articles/:articleId/report:
 *   post:
 *     tags:
 *       - article
 *     description: users can report an article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: the id of the user.
 *         from: token in Header
 *         required: true
 *       - name: article id
 *         description: the summary of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       200:
 *         description: article report
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       500:
 *         description: Server did not process request
 */
articleRouter.post('/:articleId/report', checkAuthorizedUser, reportArticle);

articleRouter.post(
  '/:articleId/rate',
  checkAuthorizedUser,
  validateRating,
  rateArticle,
);

articleRouter.post(
  '/:articleId/rate',
  checkAuthorizedUser,
  validateRating,
  rateArticle,
);

/**
 * @swagger
 *
 * /api/v1/article/:articleId/rate:
 *   post:
 *     tags:
 *       - article
 *     description: users can rate a single article.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: articleId
 *         description: the id of the article.
 *         in: params
 *         required: true
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/article'
 *     responses:
 *       200:
 *         description: article rated
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.post(
  '/:articleId/rate',
  checkAuthorizedUser,
  validateRating,
  rateArticle,
);

export default articleRouter;
