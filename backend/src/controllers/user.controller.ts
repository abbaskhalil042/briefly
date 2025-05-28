import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { login, register } from "../services/user.service";
import { CustomRequest } from "../middleware/auth";

export const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const user = await register(name, email, password);
    res.status(201).json({ message: "User registered", user });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Registration failed", error });
  }
};

//*login

export const Login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    console.log(email, password);

    const user = await login(email, password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "10d",
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Login failed", error });
  }
};

// GET /api/v1/user/me
export const getMe = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const user = await User.findById(req.user).select("-password");
  res.status(200).json({ user });
};
