import { Router } from 'express';

import { getAllRoles, updateUserRole } from './controllers/roles.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';
import verifyAdminUser from './middlewares/verify-admin.middleware';

const rolesRouter = Router();

rolesRouter.get('/', checkAuthorizedUser, verifyAdminUser, getAllRoles);

rolesRouter.put(
  '/:username',
  checkAuthorizedUser,
  verifyAdminUser,
  updateUserRole,
);

export default rolesRouter;
