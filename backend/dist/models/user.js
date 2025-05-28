"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        default: 10,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
    razorpayPaymentId: {
        type: String,
    },
    pdfs: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Pdf" }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
