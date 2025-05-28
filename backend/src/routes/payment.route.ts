import express from "express";
import { auth } from "../middleware/auth";
import { createOrder, verifyPayment } from "../controllers/payment.controller";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", auth, createOrder);
paymentRouter.post("/verify-payment", auth, verifyPayment);

export default paymentRouter;
