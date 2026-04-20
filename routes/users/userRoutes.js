import express from 'express';
import {createUser, findByEmail, loginUser, refreshToken, logoutUser} from '../../controllers/users/userController.js';

const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               role:
 *                  type: string
 *                  example: customer
 *               password:
 *                 type: string
 *                 example: password123
 *               country:
 *                 type: string
 *                 example: KE
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid email address
 *       409:
 *         description: Email already in use
 */
userRouter.post('/signup', createUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login and receive access and refresh tokens
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid email or password
 */
userRouter.post('/login', loginUser);

/**
 * @swagger
 * /api/v1/users/refresh:
 *   post:
 *     summary: Get a new access token using a refresh token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: New access token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: No refresh token provided
 *       403:
 *         description: Invalid or expired refresh token
 */
userRouter.post('/refresh', refreshToken);



/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout and invalidate refresh token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
userRouter.post('/logout', logoutUser);
/**
 * @swagger
 * /api/v1/users/{email}:
 *   get:
 *     summary: Find a user by email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email address
 *         example: john@gmail.com
 *     responses:
 *       200:
 *         description: User found
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
userRouter.get('/:email', findByEmail);

export default userRouter;