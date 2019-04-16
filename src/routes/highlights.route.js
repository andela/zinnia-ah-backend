import { Router } from 'express';

import {
  createHighlight,
  getHighlights,
  deleteHighlights,
} from '../routes/controllers/highlights.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const highlightRouter = Router();

highlightRouter.post('/:slug/highlights', checkAuthorizedUser, createHighlight);
highlightRouter.get('/:slug/highlights', checkAuthorizedUser, getHighlights);
highlightRouter.delete(
  '/:slug/highlights/:id',
  checkAuthorizedUser,
  deleteHighlights,
);

export default highlightRouter;
