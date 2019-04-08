import models from '../../db/models';
import { errorResponse, successResponse, getUserByUsername } from '../utils/helpers';

const { User } = models;

/** ,
 * Follow A User
 * @param {object} req
 * @param {object} res
 * @returns {object} followed user object
 */
const follow = async (req, res) => {
  const { url } = req;
  const { userId } = req.params;
  const { username } = req.params;

  const user = await getUserByUsername(username);
  const follower = await User.findByPk(userId);
  try {
    if (url.includes('unfollow')) {
      if (user.id === follower.id) {
        return errorResponse(res, 409, 'You cannot unfollow yourself');
      }
      await user.removeFollowers(follower);
    } else {
      if (user.id === follower.id) {
        return errorResponse(res, 409, 'You cannot follow yourself');
      }
      await user.addFollowers(follower);
    }
    const followers = await user.getFollowers();
    const userData = user.toJSON();
    userData.followers = followers.map(followee => ({
      id: followee.id,
      firstname: followee.firstname,
      lastname: followee.lastname,
    }));
    return successResponse(res, 201, 'success', userData);
  } catch (err) {
    return errorResponse(res, 500, 'Unsuccessful');
  }
};

export default follow;
