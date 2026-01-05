import {Router} from "express";
import {getUser, getUsers, updateUser, deleteUser, updateUserRole} from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import restrictTo from "../middlewares/role.middleware.js";
import { getUserDetails } from "../controllers/user.controller.js";
import { getFormationInfos } from "../controllers/user.controller.js";


const userRouter = Router();




userRouter.get('/',authorize, restrictTo('admin'), getUsers)
userRouter.get('/:id/details', authorize,restrictTo('admin'), getUserDetails)
userRouter.get('/:id', authorize,restrictTo('admin'), getUser)
userRouter.put('/:id', authorize, updateUser);
userRouter.delete('/:id', authorize, deleteUser);
userRouter.put('/edit-role/:id', authorize,restrictTo('admin'), updateUserRole)
userRouter.get('/:id/formations', authorize, getFormationInfos)

export default userRouter;

