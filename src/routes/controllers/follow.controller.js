import models from '../../db/models';
import {
  errorResponse,
  successResponse,
  getUserbyUsername,
} from '../../utils/helpers.utils';

const { User } = models;

/** ,
 * Follow A User
 * @param {object} req
 * @param {object} res
 * @returns {object} followed user object
 */
export async function follow(req, res) {
  const { user } = req;
  const { username } = req.params;

  const userToBeFollowed = await getUserbyUsername(username);
  const follower = await User.findByPk(user.id);

  try {
    if (userToBeFollowed.id === follower.id) {
      return errorResponse(res, 409, 'You cannot follow yourself');
    }
    const checkFollower = await userToBeFollowed.addFollowers(follower);
    if (!checkFollower) {
      return errorResponse(
        res,
        409,
        'error',
        'You are already following this person',
      );
    }

    const followers = await userToBeFollowed.getFollowers();
    const userData = { user: userToBeFollowed.id };
    userData.followers = followers.map(followee => ({
      id: followee.id,
      firstname: followee.firstname,
      lastname: followee.lastname,
    }));
    return successResponse(
      res,
      200,
      `You have successfully followed ${username}`,
      userData,
    );
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}

/** ,
 * Unfollow A User
 * @param {object} req
 * @param {object} res
 * @returns {object} unfollowed user object
 */
export async function unfollow(req, res) {
  const { user } = req;
  const { username } = req.params;

  const userToBeUnfollowed = await getUserbyUsername(username);
  const unfollower = await User.findByPk(user.id);

  try {
    if (userToBeUnfollowed.id === unfollower.id) {
      return errorResponse(res, 409, 'You cannot unfollow yourself');
    }
    const checkFollower = await userToBeUnfollowed.removeFollowers(unfollower);
    if (!checkFollower) {
      return errorResponse(
        res,
        409,
        'error',
        'You are not following this person',
      );
    }
    const followers = await userToBeUnfollowed.getFollowers();
    const userData = { user: userToBeUnfollowed.id };
    userData.followers = followers.map(followee => ({
      id: followee.id,
      firstname: followee.firstname,
      lastname: followee.lastname,
    }));
    return successResponse(
      res,
      200,
      `You have successfully unfollowed ${username}`,
      userData,
    );
  } catch (err) {
    return errorResponse(res, 500, err.message);
  }
}
