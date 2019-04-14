import { Router } from 'express';

import { getAll } from './controllers/roles.controller';
import checkAuthorizedUser from './middlewares/authorized-user.middleware';
import verifyAdminUser from './middlewares/verify-admin.middleware';

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
rolesRouter.get('/', checkAuthorizedUser, verifyAdminUser, getAll);

export default rolesRouter;
