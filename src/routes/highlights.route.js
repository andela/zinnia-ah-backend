import { Router } from 'express';

import {
  createHighlight,
  getHighlights,
  deleteHighlights,
} from '../routes/controllers/highlights.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';
import {
  validateReqParams,
  validateReqBody,
} from './middlewares/validate-input.middleware';
import {
  articleId,
  highlightAndArticle,
  highlightBody,
} from '../utils/validation-schema.utils';

const highlightRouter = Router();

/**
 * @swagger
 *
 * api/v1/articles/:articleId/highlights:
 *   post:
 *     description: Highlight and comment text in Article
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/aricles'
 *     responses:
 *       200:
 *         description: Text highlighted and commented on
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: Article with ID not found.
 *       5XX:
 *        description: Unexpected error.
 */
highlightRouter.post(
  '/:articleId/highlights',
  validateReqParams(articleId),
  validateReqBody(highlightBody),
  checkAuthorizedUser,
  createHighlight,
);
/**
 * @swagger
 *
 * api/v1/articles/:articleId/highlights:
 *   get:
 *     description: Get Highlights
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/articles'
 *     responses:
 *       200:
 *         description: List of highlights
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: Article with ID not found.
 *       5XX:
 *        description: Unexpected error.
 */
highlightRouter.get(
  '/:articleId/highlights',
  validateReqParams(articleId),
  checkAuthorizedUser,
  getHighlights,
);

/**
 * @swagger
 *
 * api/v1/articles/:articleId/highlights/:highlightId:
 *   delete:
 *     description: Delete Highlight
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
 *       200:
 *         description: Highlight removed
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: Article with ID not found.
 *       5XX:
 *        description: Unexpected error.
 */
highlightRouter.delete(
  '/:articleId/highlights/:id',
  validateReqParams(highlightAndArticle),
  checkAuthorizedUser,
  deleteHighlights,
);

export default highlightRouter;
