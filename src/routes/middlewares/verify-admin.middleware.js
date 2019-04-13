import { errorResponse, verifyToken } from '../../utils/helpers.utils';
import { models } from '../../db/models';

const { User } = models;

/**
 *
 *
 * @export
 * @param {object} req
 * @param {object} res
 * @param {void} next
 * @returns {void}
 */

const verifyAdminUser = async (req, res, next) => {
  const { user } = req;

  const admin = User.findOne({ where: { role: admin } });

  if (!admin) {
    return errorResponse(
      res,
      403,
      'You are not allowed to perform this action because you are not an Admin',
    );
  }
  return next();
};

export default verifyAdminUser;
