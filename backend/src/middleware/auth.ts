import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface CustomRequest extends Request {
  user?: string; // userId
}

interface JwtPayload {
  id: string;
}

export const auth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("Authorization header:", req.headers.authorization);
    console.log("Extracted token:", token);
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    console.log("Decoded token:", decoded);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
    throw error;
  }
};
