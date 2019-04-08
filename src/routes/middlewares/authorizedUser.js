import dotenv from 'dotenv';
import { errorResponse, verifyToken } from '../utils/helpers';

dotenv.config();

const checkAuthorizedUser = async (req, res, next) => {
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
    req.user = await verifyToken(token, process.env.SECRET);
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default checkAuthorizedUser;
