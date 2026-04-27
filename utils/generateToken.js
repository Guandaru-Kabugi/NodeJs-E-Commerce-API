import jwt from 'jsonwebtoken';

export function generateAccessToken(userId, role) {
  return jwt.sign(
    { id: userId, role:role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );
}

export function generateRefreshToken(userId, role) {
  return jwt.sign(
    { id: userId, role:role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
}