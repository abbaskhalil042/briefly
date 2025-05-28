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
exports.deletePdfController = exports.getPdfByIdController = exports.getPdfController = exports.pdfSummaryController = void 0;
// import Blob from 'fetch-blob';
const pdf_service_1 = require("../services/pdf.service");
const pdf_1 = __importDefault(require("../models/pdf"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = require("mongoose");
const pdfSummaryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        console.log("uploaded file from backend", req.file);
        const user = yield user_1.default.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        if (user.credits <= 0) {
            res.status(403).json({ message: "Insufficient credits" });
            return;
        }
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        const summary = yield (0, pdf_service_1.pdfSummaryService)(blob);
        const fileName = req.file.originalname.split(".")[0];
        const pdf = yield pdf_1.default.create({
            original_file: req.file.originalname,
            summary_text: summary,
            file_name: fileName,
            title: req.file.originalname,
            user: new mongoose_1.Types.ObjectId(req.params.userId),
        });
        user.pdfs.push(pdf._id);
        user.credits -= 1;
        yield user.save(); // simpler and safer than updateOne
        res
            .status(201)
            .json({ message: "PDF saved", pdf, updatedCredits: user.credits });
    }
    catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ message: "Failed to save PDF", error: error.message });
    }
});
exports.pdfSummaryController = pdfSummaryController;
const getPdfController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const pdfs = yield (0, pdf_service_1.getPdfService)(userId);
        res.status(200).json({
            success: true,
            count: pdfs.length,
            data: pdfs,
        });
    }
    catch (error) {
        const status = error.statusCode || 500;
        const response = Object.assign({ success: false, message: error.message }, (error.validation && { errors: error.validation }));
        res.status(status).json(response);
        return;
    }
});
exports.getPdfController = getPdfController;
//*get pdf by pdf if
const getPdfByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pdfId } = req.params;
        const pdf = yield (0, pdf_service_1.getPdfByIdService)(pdfId);
        res.status(200).json({
            success: true,
            data: pdf,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPdfByIdController = getPdfByIdController;
//*delete
const deletePdfController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { pdfId } = req.params;
        const userId = req.user;
        console.log("userId", userId);
        const deletedPdf = yield (0, pdf_service_1.deletePdfService)(pdfId);
        console.log("deletedPdf", deletedPdf);
        if (!deletedPdf) {
            res.status(404).json({ message: "PDF not found from" });
            return;
        }
        if (((_a = deletedPdf === null || deletedPdf === void 0 ? void 0 : deletedPdf.user) === null || _a === void 0 ? void 0 : _a.toString()) !== userId) {
            res.status(403).json({ message: "Unauthorized to delete this PDF" });
            return;
        }
        yield user_1.default.findByIdAndUpdate(userId, { $pull: { pdfs: deletedPdf._id } }, { new: true });
        res
            .status(200)
            .json({ message: "PDF deleted", deletedPdf: deletedPdf.title });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete PDF", error });
    }
});
exports.deletePdfController = deletePdfController;
