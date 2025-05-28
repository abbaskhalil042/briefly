"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pdfSchema = new mongoose_1.default.Schema({
    original_file: {
        type: String,
        required: true,
    },
    summary_text: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
const Pdf = mongoose_1.default.model("Pdf", pdfSchema);
exports.default = Pdf;
