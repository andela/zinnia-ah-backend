import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../db/models';

dotenv.config();
const secret = process.env.SECRET_KEY;

const { User } = models;
let message;
// let userId;
const follow = {
  /** ,
   * Follow A User
   * @param {object} req
   * @param {object} res
   * @returns {object} followed user object
   */
  async followUser(req, res) {
    const { username, userId } = req.params;
    // const token = req.headers['x-access-token'];
    // if (!token) {
    //   return res.status(401).json({
    //     auth: false,
    //     message: 'Token not available',
    //   });
    // }
    // jwt.verify(token, secret, (err, authData) => {
    //   if (err) {
    //     return res.status(401).json(err);
    //   }
    //   userId = authData.id;
    // });

    try {
      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        message = { body: `User with this ${username} does not exist` };
        return res.status(404).json({
          error: message,
        });
      }
      const follower = await User.findByPk(userId);
      await user.addFollowers(follower);
      const followers = await user.getFollowers();

      const userData = user.toJSON();
      userData.followers = followers.map(followee => ({
        id: followee.id,
        firstname: followee.firstname,
        lastname: followee.lastname,
      }));
      return res.status(201).json({
        data: userData,
      });
    } catch (err) {
      throw err;
    }
  },

  async unfollowUser(req, res) {
    const { username, userId } = req.params;
    // const token = req.headers['x-access-token'];
    // if (!token) {
    //   return res.status(401).json({
    //     auth: false,
    //     message: 'Token not available',
    //   });
    // }
    // jwt.verify(token, secret, (err, authData) => {
    //   if (err) {
    //     return res.status(401).json(err);
    //   }
    //   userId = authData.id;
    // });

    try {
      const user = await User.findOne({
        where: { username },
      });
      if (!user) {
        message = { body: `User with this ${username} does not exist` };
        return res.status(404).json({
          error: message,
        });
      }
      const followeeId = user.id;
      const follower = await User.findByPk(userId);

      await followeeId.removeFollowers(follower);
      const followers = await followeeId.getFollowers();
      //
      const userData = user.toJSON();
      userData.followers = followers.map(followee => ({
        id: followee.id,
        firstname: followee.firstname,
        lastname: followee.lastname,
      }));
      return res.status(201).json({
        data: userData,
      });
    } catch (err) {
      throw err;
    }
  },
};

export default follow;
