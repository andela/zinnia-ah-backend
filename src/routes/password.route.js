import { Router } from 'express';

import {
  forgotPassword,
  resetPassword,
} from './controllers/password.controller';

const passwordRouter = Router();

passwordRouter.post('/forgot-password', forgotPassword);

passwordRouter.patch('/reset-password/:token', resetPassword);

export default passwordRouter;
