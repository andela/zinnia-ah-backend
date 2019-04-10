import dotenv from 'dotenv';
import { errorResponse, verifyToken } from '../utils/helpers';

dotenv.config();

const checkAuthorizedUser = async (req, res, next) => {
  const token = req.headers.authorization || req.headers['x-access-token'];

  if (!token) {
    return errorResponse(res, 401, 'Please provide a JWT token');
  }
  req.user = await verifyToken(token, process.env.SECRET);
  if (!req.user) {
    return errorResponse(
      res,
      400,
      'Token is invalid, please provide a valid token',
    );
  }
  return next();
};

export default checkAuthorizedUser;
