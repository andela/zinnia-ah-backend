import { Router } from 'express';

import { createUser, confirmUser } from './controllers/users';
import validateNewUser from './middlewares/validateUser';
const userRouter = Router();

userRouter.post('/', validateNewUser, createUser);
userRouter.get('/confirmation/:token', confirmUser);

export default userRouter;
