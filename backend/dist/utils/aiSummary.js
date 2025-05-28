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
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY in environment variables");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
function aiSummary(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                temperature: 0.4,
                responseMimeType: "text/plain", // use "application/json" only if your output will be JSON
            },
            systemInstruction: {
                role: "system",
                parts: [
                    {
                        text: `
Generate a professional summary of the PDF content following these strict formatting rules:

Each section must start with the section title exactly as in the PDF, formatted as bold and underlined text (do not use markdown syntax, just make it visually bold and underlined).

Under each section title, list key points as bullet points using a square bullet (■).

Each bullet must begin with a relevant emoji that reflects the content. Do not repeat the same emoji within the same section unless absolutely necessary.

Each bullet point should be 1-2 concise sentences summarizing a single key idea or fact.

The entire output must be clean and visually consistent with no markdown characters (*, #, -, etc.), no extra spaces, and no additional commentary.

Maintain the exact order of sections and content from the PDF.

Give me a clean format with:

Bold headings (no underline, just ** **)

● Black circular bullet points (not dashes or numbers)

Concise answers under each heading

Skip any extra symbols like <u></u> or emojis

Example Output:
What is rate limiting?
● Limits requests per user/IP to prevent abuse.
● Protects servers from overload or attacks.

How to cache database queries?
● Use Redis for frequent query results.
● Reduces database load and speeds up responses


         

`,
                    },
                ],
            },
        });
        const result = yield model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: text }],
                },
            ],
        });
        const response = yield result.response.text();
        console.log("response from the AI 🤖", response);
        return response;
    });
}
exports.default = aiSummary;
