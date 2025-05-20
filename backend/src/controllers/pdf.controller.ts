import { Request, Response } from "express";
// import Blob from 'fetch-blob';
import {
  deletePdfService,
  getPdfByIdService,
  getPdfService,
  pdfSummaryService,
} from "../services/pdf.service";
import Pdf from "../models/pdf";
import User from "../models/user";
import mongoose, { Types } from "mongoose";
import { CustomRequest } from "../middleware/auth";

interface pdfTypes {
  original_file: string;
  summary_text: string;
  title: string;
  file_name: string;
  user: Types.ObjectId | string;
}

export const pdfSummaryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    console.log("uploaded file from backend", req.file);
    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (user.credits <= 0) {
      res.status(403).json({ message: "Insufficient credits" });
      return;
    }
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
    const summary = await pdfSummaryService(blob);
    const fileName = req.file.originalname.split(".")[0];

    const pdf = await Pdf.create({
      original_file: req.file.originalname,
      summary_text: summary,
      file_name: fileName,
      title: req.file.originalname,
      user: new Types.ObjectId(req.params.userId as string),
    });

    user.pdfs.push(pdf._id as mongoose.Types.ObjectId);
    user.credits -= 1;
    await user.save(); // simpler and safer than updateOne

    res
      .status(201)
      .json({ message: "PDF saved", pdf, updatedCredits: user.credits });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Failed to save PDF", error: error.message });
  }
};
export const getPdfController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const pdfs = await getPdfService(userId);
    res.status(200).json({
      success: true,
      count: pdfs.length,
      data: pdfs,
    });
  } catch (error: any) {
    const status = error.statusCode || 500;
    const response = {
      success: false,
      message: error.message,
      ...(error.validation && { errors: error.validation }),
    };

    res.status(status).json(response);
    return;
  }
};

//*get pdf by pdf if
export const getPdfByIdController = async (req: Request, res: Response) => {
  try {
    const { pdfId } = req.params;
    const pdf = await getPdfByIdService(pdfId);
    res.status(200).json({
      success: true,
      data: pdf,
    });
  } catch (error: any) {
    console.log(error);
  }
};

//*delete

export const deletePdfController = async (req: Request, res: Response) => {
  try {
    const { pdfId } = req.params;
    const userId = (req as CustomRequest).user;
    console.log("userId", userId);
    const deletedPdf = await deletePdfService(pdfId);
    console.log("deletedPdf", deletedPdf);

    if (!deletedPdf) {
      res.status(404).json({ message: "PDF not found from" });
      return;
    }

    if (deletedPdf?.user?.toString() !== userId) {
      res.status(403).json({ message: "Unauthorized to delete this PDF" });
      return;
    }

    await User.findByIdAndUpdate(
      userId,
      { $pull: { pdfs: deletedPdf._id } },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "PDF deleted", deletedPdf: deletedPdf.title });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete PDF", error });
  }
};
