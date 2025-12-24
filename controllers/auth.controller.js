import mongoose from "mongoose";
import User from "../models/user.model.js";
import  bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

const MIN_PASSWORD_LENGTH = 8;


export const signUp = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();


    try {
        const { firstName, lastName, phoneNumber, address, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            const error = new Error("Missing required fields");
            error.statusCode = 400;
            throw error;
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            const error = new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
            error.statusCode = 400;
            throw error;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            firstName,
            lastName,
            address,
            email,
            password: hashedPassword
        }], {session});

        const token = jwt.sign(
            { userId: newUser[0]._id },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        await session.commitTransaction();

        session.endSession();

        const user = newUser[0].toObject();
        delete user.password;


        res.status(201).json({
            success: true,
            message: "User successfully created",
            data: {
                token,
                user
            }
        });

    } catch (error) {
        next(error);
    }
};



export const signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
      }
  
      const user = await User.findOne({ email }).select('+password');
  
      if (!user) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
      }
  
      const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
  
      const userObject = user.toObject();
      delete userObject.password;
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          token,
          user: userObject
        }
      });
  
    } catch (error) {
      next(error);
    }
  };
  

export const signOut = async (req, res) => {
    // Implement sign out login
}