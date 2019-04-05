import { Router } from 'express';
import { createUser, confirmUser, } from './controllers/users';

const router = Router();

/**
 * @swagger
 * definition:
 *    default:
 *    users:
 *    profiles:
 *    articles:
 *    tags:
 */
/**
 * @swagger
 *
 * /api/v1/users:
 *   post:
 *     description: User Registration Endpoint
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/users'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
router.post('/users', createUser);
router.get('/users/confirmation/:token', confirmUser);

export default router;
