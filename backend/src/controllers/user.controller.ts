import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { login, register } from "../services/user.service";

export const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const user = await register(fullName, email, password);
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

    const user = await login(email, password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Login failed", error });
  }
};
