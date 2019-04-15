import { errorResponse } from '../../utils/helpers.utils';
import models from '../../db/models';
import { ADMIN } from '../../utils/constants';

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

  const requestUser = await User.findOne({
    where: { id: user.id, role: ADMIN },
  });

  if (!requestUser) {
    return errorResponse(
      res,
      403,
      'You are not allowed to perform this action because you are not an Admin',
    );
  }
  return next();
};

export default verifyAdminUser;
