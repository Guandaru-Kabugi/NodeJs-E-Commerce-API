import UserService from "../../services/users/userService.js";

export async function createUser(req,res,next) {
    try {
        const userData = {
            ...req.body, 
            role: "customer"
        }
        const user = await UserService.createUser(userData);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}
export async function findByEmail(req,res, next) {
    try {
        const user = await UserService.findByEmail(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await UserService.loginUser(email, password);

    // Send refresh token as httpOnly cookie (not accessible via JS)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    });

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const token = req.body.refreshToken;
    if (!token) throw new AppError('No refresh token', 401);

    const accessToken = await UserService.refreshAccessToken(token);
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

export async function logoutUser(req, res, next) {
  try {
    await UserService.logoutUser(req.user.id);
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
}