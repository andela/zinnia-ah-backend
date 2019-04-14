import { Router } from 'express';

import { getAll } from './controllers/roles.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';
import verifyAdminUser from './middlewares/verify-admin.middleware';

const rolesRouter = Router();

rolesRouter.get('/', checkAuthorizedUser, verifyAdminUser, getAll);

export default rolesRouter;
