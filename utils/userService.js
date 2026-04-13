import AppError from "../utils/appError.js";
import UserModel from "../models/users.js";
import bcrypt from "bcrypt";
import validator from "validator";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

class UserService {
  static async createUser(userData) {
    // 1. Validate first
    if (!validator.isEmail(userData.email)) {
      throw new AppError("Invalid email address", 400);
    }
    // 2. Then check duplicate
    const existing = await UserModel.findByEmail(userData.email);
    if (existing) throw new AppError("Email already in use", 409);

    // 3. Hash and create
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await UserModel.createUser({
      ...userData,
      password: hashedPassword,
    });
  }
  static async findByEmail(email) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new AppError(`User with email ${email} not found`, 404);
    return user;
  }

  static async findById(id) {
    const user = await UserModel.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  static async loginUser(email, password) {
    // 1. Find user
    const user = await UserModel.findByEmail(email);
    if (!user) throw new AppError("Invalid email or password", 401);

    // 2. Verify password
    const isMatch = await UserModel.isValidPassword(password, user.password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    // 3. Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // 4. Persist refresh token
    await UserModel.saveRefreshToken(user.id, refreshToken);

    // 5. Return tokens and safe user object (no password)
    const { password: _, refresh_token: __, ...safeUser } = user;
    return { accessToken, refreshToken, user: safeUser };
  }

  static async refreshAccessToken(refreshToken) {
    // 1. Check token exists in DB
    const user = await UserModel.findByRefreshToken(refreshToken);
    if (!user) throw new AppError("Invalid refresh token", 403);

    // 2. Verify it hasn't expired
    try {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      throw new AppError("Refresh token expired, please log in again", 403);
    }

    // 3. Issue new access token
    return generateAccessToken(user.id);
  }

  static async logoutUser(userId) {
    await UserModel.saveRefreshToken(userId, null); // clears the stored token
  }
}

export default UserService;
