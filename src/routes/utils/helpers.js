import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const {
  SECRET_KEY,
} = process.env;

export const errorResponse = (res, statusCode, message, data) => res.status(statusCode).json({
  status: 'error',
  message,
  data
});

export const successResponse = (res, statusCode, message, data) => res.status(statusCode).json({
  status: 'success',
  message,
  data
});

export const generateToken = async (payload) => {
  const token = await jwt.sign(payload, SECRET_KEY, {
    expiresIn: '14d',
  });
  return token;
};

export const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, SECRET_KEY);
  return decoded;
};
