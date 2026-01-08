import {Router} from 'express';
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: The last name of the user
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5MzY5MzY5MzY5MzY5MzY5IiwiaWF0IjoxNzAzNjI0MDIyfQ.9_8yL5HbW_5jO0eJ9955555555555555555555555"
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "656936936936936936936936"
 *                         firstName:
 *                           type: string
 *                           example: "John"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         password:
 *                           type: string
 *                           example: "password123"
 *                         roles:
 *                           type: array
 *                           example: ["trainee"]
 *                         isActive:
 *                           type: boolean
 *                           example: true
 *                         location:
 *                           type: object
 *                           properties:
 *                             city:
 *                               type: string
 *                               example: "New York"
 *                             state:
 *                               type: string
 *                               example: "New York"
 *                             country:
 *                               type: string
 *                               example: "United States"
 *                         isVerified:  
 *                           type: boolean
 *                           example: false
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /api/v1/auth/sign-in:
 *   post:
 *     summary: Sign in a user
 *     tags: [Auth]
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
 *                 description: The email of the user
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User signed in successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY5MzY5MzY5MzY5MzY5MzY5IiwiaWF0IjoxNzAzNjI0MDIyfQ.9_8yL5HbW_5jO0eJ9955555555555555555555555"
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "656936936936936936936936"
 *                         firstName:
 *                           type: string
 *                           example: "John"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         email:
 *                           type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 * 
 * @swagger
 * /api/v1/auth/sign-out:
 *   post:
 *     summary: Sign out a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
authRouter.post ('/sign-up' , signUp);
authRouter.post ('/sign-in' , signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;

