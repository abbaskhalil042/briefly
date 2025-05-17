import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import dbConnect from "./config/db";
import pdfRouter from "./routes/pdf.route";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/pdf", pdfRouter);

app.listen(PORT, () => {
  dbConnect();
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
