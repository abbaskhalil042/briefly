import express from "express";
import { getMe, Login, Register } from "../controllers/user.controller";
import { auth } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);
userRouter.get("/me", auth, getMe);

export default userRouter;
