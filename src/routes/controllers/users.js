import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../../db/models';
import sendMail from '../../config/mailConfig';

dotenv.config();

const {  User } = models;
const secret = process.env.SECRET_KEY;
const expires = { expiresIn: '30days' };
const generateToken = payload => jwt.sign(payload, secret, expires);

const Users = {
  
/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async createUser(req, res) {

    const {
      username, email, password
    } = req.body;

    const data = {
      username, 
      email, 
      password,
    };

    try {
      const user = await User.create(data);
      const tokenPayload = { id: user.id, email: user.email }; 
      const token = generateToken(tokenPayload);
      const url = process.env.NODE_ENV === 'test' ? `http://localhost:3000/api/v1/confirmation/${token}`: 
      `https://zinnia-ah-backend-staging.herokuapp.com/api/v1/${token}`;

      const emailDetails = {
        receivers: [`${email}`],
        subject: 'Verification email',
        text: '',
        html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
      };

      sendMail(emailDetails);
      
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
  },


  async confirmUser(req, res){
    try{
      const decoded = await jwt.verify(req.params.token, process.env.SECRET_KEY);
      const { id } = decoded;
      const response = await User.update({confirmed: true}, {returning: true, where: { id }});
      const responseData = {
        confirmed: response[1][0].confirmed,
      }
      return res.status(201).json({
        status: 201,
        message: 'Your account has been verified',
        data: responseData,
      });
    } catch (err){
      return res.status(500).json({
        status: 500,
        error: err
      });
    }
  },

  
};




export default Users;
