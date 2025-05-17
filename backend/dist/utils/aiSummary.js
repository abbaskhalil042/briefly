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
Object.defineProperty(exports, "__esModule", { value: true });
const genai_1 = require("@google/genai");
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
function aiSummary(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Please analyze the attached PDF document. Summarize the key sections in a clear and concise manner, capturing all essential points, arguments, and conclusions. Reformat the content into a visually appealing structure using well-organized headings, bullet points, and short paragraphs. Where possible, add callout boxes for definitions, tables for structured data, and use bold formatting for emphasis on important terms. Maintain the logical flow and ensure readability for someone unfamiliar with the original document.
    Document: ${text}
    `,
        });
        return response;
    });
}
exports.default = aiSummary;
