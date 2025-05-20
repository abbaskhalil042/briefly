import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Request, Response } from "express";
import aiSummary from "../utils/aiSummary";
import cleanSummary from "../utils/removingSpaceFromSummary";
import Pdf from "../models/pdf";
import User from "../models/user";
import mongoose from "mongoose";

export const pdfSummaryService = async (blob: any) => {
  try {
    const pdfLoader = new PDFLoader(blob);
    const pdfDocs = await pdfLoader.load();
    const text = pdfDocs.map((doc: any) => doc.pageContent).join("\n\n");
    const summary = await aiSummary(text);
    const refactoredSummary = cleanSummary(summary);
    return refactoredSummary;
  } catch (error: any) {
    console.log(error.message);
    console.error("Error in pdfSummaryService:", error.message);
    throw error; // Re-throw to let controller handle it
  }
};

export const getPdfService = async (userId: string) => {
  // 1. Validate ID format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw {
      statusCode: 400,
      message: "Invalid user ID format",
      validation: { userId: "Must be a valid MongoDB ObjectId" },
    };
  }

  // 2. Check user exists and get PDFs in single query
  const result = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) },
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
};

//*get pdf by pdf id

export const getPdfByIdService = async (pdfId: string) => {
  try {
    const pdf = await Pdf.findById(pdfId);
    return pdf;
  } catch (error) {
    console.error("Error in getPdfByIdService:", error);
    throw error;
  }
};

//*delete

export const deletePdfService = async (pdfId: string) => {
  try {
    return await Pdf.findByIdAndDelete(pdfId);
  } catch (error) {
    console.error("Error in deletePdfService:", error);
    throw error;
  }
};
