"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const pdf_controller_1 = require("../controllers/pdf.controller");
const pdfRouter = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
pdfRouter.get("/:userId", auth_1.auth, pdf_controller_1.getPdfController);
pdfRouter.post("/upload/:userId", auth_1.auth, upload.single("original_file"), pdf_controller_1.pdfSummaryController);
pdfRouter.delete("/delete-pdf/:pdfId", auth_1.auth, pdf_controller_1.deletePdfController);
pdfRouter.get("/get-pdf/:pdfId", auth_1.auth, pdf_controller_1.getPdfByIdController);
exports.default = pdfRouter;
