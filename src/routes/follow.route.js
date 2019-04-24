import { Router } from 'express';
import { follow, unfollow } from './controllers/follow.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const followRouter = Router();

followRouter.post('/:username/follow', checkAuthorizedUser, follow);

followRouter.delete('/:username/unfollow/', checkAuthorizedUser, unfollow);

export default followRouter;
