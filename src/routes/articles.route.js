import { Router } from 'express';

import { create, getAll, findArticle } from './controllers/articles.controller';
import { validUuid } from './middlewares/validateInput';

const articleRouter = Router();

/**
 * @swagger
 *
 * /api/v1/article:
 *   post:
 *     tags:
 *       - article
 *     description: users can create an article.
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
 *         description: url to all images in the articles. {string} seperated with a comma.
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
articleRouter.post('/', create);

/**
 * @swagger
 *
 * /api/v1/article:
 *   post:
 *     tags:
 *       - article
 *     description: users can fetch a single article.
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
 *         description: article fetched
 *       404:
 *         description: article not found
 *       500:
 *         description: Database error
 */
articleRouter.get('/:articleId', validUuid, findArticle);

export default articleRouter;
