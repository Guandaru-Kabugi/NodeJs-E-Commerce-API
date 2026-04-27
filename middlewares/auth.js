// middlewares/auth.js
import jwt from 'jsonwebtoken';
import UserService from '../services/users/userService.js';
import AppError from '../utils/appError.js';
import dotenv from 'dotenv';

dotenv.config();

const authenticateUser = async (req, res, next) => {
  try {
    // 1. Check header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // 4. Check user still exists
    const user = await UserService.findById(decoded.id);
    if (!user) throw new AppError('User no longer exists', 401);

    // 5. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    // jwt.verify throws its own errors — map them to AppError
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError('Invalid token', 401));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token expired, please log in again', 401));
    }
    next(error);
  }
};

export default authenticateUser;