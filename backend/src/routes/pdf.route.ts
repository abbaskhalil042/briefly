import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth";
import {
  deletePdfController,
  getPdfByIdController,
  getPdfController,
  pdfSummaryController,
} from "../controllers/pdf.controller";

const pdfRouter = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

pdfRouter.get("/:userId", auth, getPdfController);
pdfRouter.post(
  "/upload/:userId",
  auth,
  upload.single("original_file"),
  pdfSummaryController
);

pdfRouter.delete("/delete-pdf/:pdfId", auth, deletePdfController);
pdfRouter.get("/get-pdf/:pdfId", auth, getPdfByIdController);

export default pdfRouter;
