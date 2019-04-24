import { Router } from 'express';

import {
  createHighlight,
  getHighlights,
  deleteHighlights,
} from '../routes/controllers/highlights.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const highlightRouter = Router();

highlightRouter.post(
  '/:articleId/highlights',
  checkAuthorizedUser,
  createHighlight,
);
highlightRouter.get(
  '/:articleId/highlights',
  checkAuthorizedUser,
  getHighlights,
);

highlightRouter.delete(
  '/:articleId/highlights/:id',
  checkAuthorizedUser,
  deleteHighlights,
);

export default highlightRouter;
