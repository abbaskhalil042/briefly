"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.createOrder = void 0;
const razorpay_1 = __importDefault(require("../utils/razorpay/razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const user_1 = __importDefault(require("../models/user"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plan, userId } = req.body;
    let amount = 0;
    if (plan === "$9")
        amount = 9;
    else if (plan === "$19")
        amount = 19;
    else if (plan === "$29")
        amount = 29;
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
        const order = yield razorpay_1.default.orders.create(options);
        res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            userId,
            plan,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Order creation failed" });
    }
});
exports.createOrder = createOrder;
//? verify
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan, } = req.body;
    const expectedSignature = crypto_1.default
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
    if (expectedSignature !== razorpay_signature) {
        res.status(400).json({ success: false, message: "Invalid signature" });
        return;
    }
    try {
        const user = yield user_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (plan === "$9")
            user.credits += 50;
        else if (plan === "$19")
            user.credits += 150;
        else if (plan === "$29") {
            user.isPremium = true;
        }
        user.razorpayPaymentId = razorpay_payment_id;
        yield user.save();
        console.log("Payment verified for user:", user);
        res
            .status(200)
            .json({ success: true, message: "Payment verified & user updated" });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error updating user" });
    }
});
exports.verifyPayment = verifyPayment;
