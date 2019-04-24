import { Router } from 'express';

import {
  getAllAuthors,
  getAuthorProfile,
  updateUserProfile,
  getReadingStats,
} from './controllers/users.controller';

import checkAuthorizedUser from './middlewares/authorized-user.middleware';

const userRouter = Router();

userRouter.get('/', getAllAuthors);

userRouter.put('/profile/:userId', checkAuthorizedUser, updateUserProfile);

userRouter.get('/profiles/:username', getAuthorProfile);

userRouter.get(
  '/profiles/:username/stats',
  checkAuthorizedUser,
  getReadingStats,
);

export default userRouter;
