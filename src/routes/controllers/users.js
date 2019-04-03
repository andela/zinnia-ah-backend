import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../db/models';

dotenv.config();

const { User } = models;
const secret = process.env.SECRET_KEY;
const expires = { expiresIn: '30days' };
const generateToken = payload => jwt.sign(payload, secret, expires);
import path from 'path';
const Users = {
/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async createUser(req, res) {
    console.log(__dirname);
    const {
      username, email, password
    } = req.body;
    const data = {
      username, email, password,
    };
    try {
      const user = await User.create(data);
      const tokenPayload = { id: user.id, email: user.email };
      const token = generateToken(tokenPayload);
      return res.status(201).json({
        status: 201,
        username: user.username,
        token,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err
      });
    }
  }
};
export default Users;
