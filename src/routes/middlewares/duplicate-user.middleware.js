import {
  getUserbyUsername,
  getUserbyId,
  errorResponse,
  checkDuplicateUser,
} from '../../utils/helpers.utils';

/**
 *
 *
 * @export
 * @param {object} req express request
 * @param {object} res express response
 * @param {void} next handler
 * @returns {void}
 */
export async function usernameChecker(req, res, next) {
  const { id } = req.user;
  const { username } = req.body;
  const user = await getUserbyId(id);
  const usernameExists = await getUserbyUsername(username);

  if (usernameExists && user.id !== usernameExists.id) {
    return errorResponse(
      res,
      409,
      'Sorry, this username has already been taken',
    );
  }
  return next();
}

/**
 *
 *
 * @export
 * @param {object} req express request
 * @param {object} res express response
 * @param {void} next handler
 * @returns {void}
 */
export async function userCredentialsChecker(req, res, next) {
  const { email, username } = req.body;
  const response = await checkDuplicateUser(email, username);

  if (response) {
    if (response.username === username) {
      return errorResponse(
        res,
        409,
        'Sorry, this username has already been taken',
      );
    }
    if (response.email === email) {
      return errorResponse(
        res,
        409,
        'Sorry, this email has already been taken',
      );
    }
  }
  return next();
}
