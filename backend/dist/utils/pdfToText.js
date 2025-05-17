"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const nike10kPdfPath = "../../../../data/nke-10k-2023.pdf";
const loader = new pdf_1.PDFLoader(nike10kPdfPath);
const docs = loader.load();
