import {Router} from "express";
import {getUser, getUsers} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import restrictTo from "../middlewares/role.middleware.js";


const userRouter = Router();

// GET /users -> get all users
// GET /users/:id -> get user by id


userRouter.get('/',authorize, restrictTo('admin'), getUsers)

// /:id stands for dynamic parameters
userRouter.get('/:id', authorize,restrictTo('admin'), getUser)

export default userRouter;

