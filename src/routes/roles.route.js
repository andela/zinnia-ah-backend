import { Router } from 'express';

import { getAllRoles, updateUserRole } from './controllers/roles.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';
import verifyAdminUser from './middlewares/verify-admin.middleware';
import {
  validateReqParams,
  validateReqBody,
} from './middlewares/validate-input.middleware';
import { role, usernameOnly } from '../utils/validation-schema.utils';

const rolesRouter = Router();

/**
 * @swagger
 *
 * /api/v1/roles:
 *   get:
 *     description: Get roles
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/roles'
 *     responses:
 *       200:
 *         description: Request successful
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       403:
 *        description: Access Forbidden.
 *       5XX:
 *        description: Unexpected error.
 */
rolesRouter.get('/', checkAuthorizedUser, verifyAdminUser, getAllRoles);

/**
 * @swagger
 *
 * /api/v1/roles:
 *   get:
 *     description: make a user an admin
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/roles'
 *     responses:
 *       200:
 *         description: Request successful
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       403:
 *        description: Access Forbidden.
 *       5XX:
 *        description: Unexpected error.
 */
rolesRouter.put(
  '/:username',
  validateReqParams(usernameOnly),
  validateReqBody(role),
  checkAuthorizedUser,
  verifyAdminUser,
  updateUserRole,
);

export default rolesRouter;
