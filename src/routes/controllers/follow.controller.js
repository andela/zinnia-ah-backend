import models from '../../db/models';
import {
  errorResponse,
  successResponse,
  getUserbyUsername,
} from '../utils/helpers';

const { User } = models;

/** ,
 * Follow A User
 * @param {object} req
 * @param {object} res
 * @returns {object} followed user object
 */
const follow = async (req, res) => {
  const { url } = req;
  const { user } = req;
  const { username } = req.params;

  const userToBeFollowed = await getUserbyUsername(username);
  const follower = await User.findByPk(user.id);
  try {
    if (url.includes('unfollow')) {
      if (userToBeFollowed.id === follower.id) {
        return errorResponse(res, 409, 'You cannot unfollow yourself');
      }
      const checkFollower = await userToBeFollowed.removeFollowers(follower);
      if (!checkFollower) {
        return successResponse(
          res,
          409,
          'error',
          'You are not following this person',
        );
      }
    } else {
      if (userToBeFollowed.id === follower.id) {
        return errorResponse(res, 409, 'You cannot follow yourself');
      }
      const checkFollower = await userToBeFollowed.addFollowers(follower);
      if (!checkFollower) {
        return successResponse(
          res,
          409,
          'error',
          'You are already following this person',
        );
      }
    }
    const followers = await userToBeFollowed.getFollowers();
    const userData = { user: userToBeFollowed.id };
    userData.followers = followers.map(followee => ({
      id: followee.id,
      firstname: followee.firstname,
      lastname: followee.lastname,
    }));
    return successResponse(res, 201, userData);
  } catch (err) {
    return errorResponse(res, 500);
  }
};

export default follow;
