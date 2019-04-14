import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { SECRET_KEY } = process.env;

export const errorResponse = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    status: 'error',
    message,
    data,
  });

export const successResponse = (res, statusCode, message, data) =>
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });

export const generateToken = async payload => {
  const token = await jwt.sign(payload, SECRET_KEY, {
    expiresIn: '14d',
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header === 'undefined') {
    return errorResponse(
      res,
      401,
      'You are not authorized to make this action',
    );
  }

  const token = header.split(' ')[1];
  if (!token) {
    return errorResponse(
      res,
      401,
      'You are not authorized to make this action please login',
    );
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};
