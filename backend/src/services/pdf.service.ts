import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Request, Response } from "express";
import aiSummary from "../utils/aiSummary";
import cleanSummary from "../utils/removingSpaceFromSummary";
import Pdf from "../models/pdf";
import User from "../models/user";

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
  try {
    const pdfs = await Pdf.find({ user: userId });
    if (pdfs.length === 0) {
      throw new Error("No PDFs found for this user");
    }
    return pdfs;
  } catch (error) {
    console.error("Error in getPdfService:", error);
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
