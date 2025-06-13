import express from "express";
import { signUp, login } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.get("/login", login);

export default authRouter;