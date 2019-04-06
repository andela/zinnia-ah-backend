import { Router } from 'express';
import { updateUserProfile, getUser} from './controllers/users';

const userRouter = Router();

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
 * /api/v1/users/:userId:
 *   put:
 *     description: Update User Profile Endpoint
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
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
userRouter.put('/:userId', updateUserProfile);

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
 * /api/v1/users/:username:
 *   gett:
 *     description: Get User Profile Endpoint
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
 *       200:
 *         description: User found
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
userRouter.get('/:username', getUser);

export default userRouter;
