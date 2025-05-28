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
exports.deletePdfService = exports.getPdfByIdService = exports.getPdfService = exports.pdfSummaryService = void 0;
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const aiSummary_1 = __importDefault(require("../utils/aiSummary"));
const removingSpaceFromSummary_1 = __importDefault(require("../utils/removingSpaceFromSummary"));
const pdf_2 = __importDefault(require("../models/pdf"));
const user_1 = __importDefault(require("../models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const pdfSummaryService = (blob) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdfLoader = new pdf_1.PDFLoader(blob);
        const pdfDocs = yield pdfLoader.load();
        const text = pdfDocs.map((doc) => doc.pageContent).join("\n\n");
        const summary = yield (0, aiSummary_1.default)(text);
        const refactoredSummary = (0, removingSpaceFromSummary_1.default)(summary);
        return refactoredSummary;
    }
    catch (error) {
        console.log(error.message);
        console.error("Error in pdfSummaryService:", error.message);
        throw error; // Re-throw to let controller handle it
    }
});
exports.pdfSummaryService = pdfSummaryService;
const getPdfService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Validate ID format
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw {
            statusCode: 400,
            message: "Invalid user ID format",
            validation: { userId: "Must be a valid MongoDB ObjectId" },
        };
    }
    // 2. Check user exists and get PDFs in single query
    const result = yield user_1.default.aggregate([
        {
            $match: { _id: new mongoose_1.default.Types.ObjectId(userId) },
        },
        {
            $lookup: {
                from: "pdfs", // Collection name
                localField: "_id",
                foreignField: "user",
                as: "pdfs",
                pipeline: [
                    { $sort: { createdAt: -1 } },
                    {
                        $project: {
                            original_file: 1,
                            summary_text: 1,
                            file_name: 1,
                            createdAt: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                pdfs: 1,
                userExists: { $cond: [{ $ne: ["$_id", null] }, true, false] },
            },
        },
    ]);
    // 3. Handle results
    if (result.length === 0 || !result[0].userExists) {
        throw { statusCode: 404, message: "User not found" };
    }
    return result[0].pdfs || [];
});
exports.getPdfService = getPdfService;
//*get pdf by pdf id
const getPdfByIdService = (pdfId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdf = yield pdf_2.default.findById(pdfId);
        return pdf;
    }
    catch (error) {
        console.error("Error in getPdfByIdService:", error);
        throw error;
    }
});
exports.getPdfByIdService = getPdfByIdService;
//*delete
const deletePdfService = (pdfId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield pdf_2.default.findByIdAndDelete(pdfId);
    }
    catch (error) {
        console.error("Error in deletePdfService:", error);
        throw error;
    }
});
exports.deletePdfService = deletePdfService;
