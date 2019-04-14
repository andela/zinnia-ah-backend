import { errorResponse, verifyToken } from '../../utils/helpers.utils';
import models from '../../db/models';

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

  const requestUser = await User.findOne({ where: { id: user.id } });

  const userData = requestUser.toJSON();

  userData.role = await requestUser.getRole();

  const { name } = userData.role[0];

  if (name !== 'admin') {
    return errorResponse(
      res,
      403,
      'You are not allowed to perform this action because you are not an Admin',
    );
  }
  return next();
};

export default verifyAdminUser;
