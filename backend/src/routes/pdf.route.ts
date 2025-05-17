import express from "express";
import multer from "multer";
import { auth } from "../middleware/auth";
import {
  deletePdfController,
  getPdfController,
  pdfSummaryController,
} from "../controllers/pdf.controller";

const pdfRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

pdfRouter.get("/summary/:userId", auth, getPdfController);
pdfRouter.post(
  "/upload/:userId",
  auth,
  upload.single("original_file"),
  pdfSummaryController
);

pdfRouter.delete("/delete-pdf/:pdfId", auth, deletePdfController);

export default pdfRouter;
