import express from "express";
import { loggedUser,getAllUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/loggedUser", authMiddleware, loggedUser);
userRouter.get('/getAllUser',authMiddleware,getAllUser)

export default userRouter;