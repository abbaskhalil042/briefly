"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payment_controller_1 = require("../controllers/payment.controller");
const paymentRouter = express_1.default.Router();
paymentRouter.post("/create-order", auth_1.auth, payment_controller_1.createOrder);
paymentRouter.post("/verify-payment", auth_1.auth, payment_controller_1.verifyPayment);
exports.default = paymentRouter;
