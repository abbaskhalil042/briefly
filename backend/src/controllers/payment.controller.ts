// controllers/paymentController.ts
import { Request, Response } from "express";
import RazorpayInstance from "../utils/razorpay/razorpay";
import crypto from "crypto";
import User from "../models/user";
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { plan, userId } = req.body;

  let amount = 0;
  if (plan === "$9") amount = 9;
  else if (plan === "$19") amount = 19;
  else if (plan === "$29") amount = 29;
  else {
    res.status(400).json({ success: false, message: "Invalid plan" });
    return;
  }

  try {
    const options = {
      amount: amount * 100, // in paisa
      currency: "USD", // or INR if using local
      receipt: `receipt_${Date.now()}`,
    };

    const order = await RazorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      userId,
      plan,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};

//? verify

export const verifyPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    userId,
    plan,
  } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    res.status(400).json({ success: false, message: "Invalid signature" });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (plan === "$9") user.credits += 50;
    else if (plan === "$19") user.credits += 150;
    else if (plan === "$29") {
      user.isPremium = true;
    }

    user.razorpayPaymentId = razorpay_payment_id;
    await user.save();

    console.log("Payment verified for user:", user);

    res
      .status(200)
      .json({ success: true, message: "Payment verified & user updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating user" });
  }
};
