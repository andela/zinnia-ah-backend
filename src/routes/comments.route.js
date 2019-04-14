import { Router } from 'express';

import { likeComment } from './controllers/comments.controller';
import { checkAuthorizedUser } from './middlewares/authorized-user.middleware';
const commentsRouter = Router();

commentsRouter.post('/:commentId/like', checkAuthorizedUser, likeComment);

export default commentsRouter;
