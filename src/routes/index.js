import { Router } from 'express';
import welcome from './controllers';

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
 * /api/v1/welcome:
 *   get:
 *     description: Default Welcome Message
 *     produces:
 *       - application/json
 *     request:
 *         content:
 *         - application/json
 *         schema:
 *           type: array
 *           items:
 *         $ref: '#/definitions/default'
 *     responses:
 *       200:
 *         description: welcome message
 *       400:
 *         description: Bad request.
 *       401:
 *         description: Authorization information is missing or invalid.
 *       404:
 *        description: A user with the specified ID was not found.
 *       5XX:
 *        description: Unexpected error.
 */
router.get('/welcome', welcome);

export default router;
