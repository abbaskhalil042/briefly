import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

async function aiSummary(text: string) {
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
         
Analyze the PDF and generate a clear, concise summary that meets the following guidelines:

Use bullet points only—no paragraphs. Each bullet must start with a relevant emoji.

Summarize one key idea or fact per bullet in 1–2 sentences, focusing on clarity and brevity.

Follow the exact order of sections in the PDF. Introduce each section with a bold, underlined heading.

Select emojis carefully to match the content (for example, 💡 for concepts, 🔑 for security, 🚀 for processes, 🛡️ for protections). Avoid repeating the same emoji more than once per section unless necessary.

Do not include any personal opinions, interpretations, or commentary. Only summarize what is explicitly stated in the PDF.

Format the summary cleanly and professionally, with no markdown symbols such as asterisks *, backslashes, or excessive punctuation. The output should be easy to read and skim.

Start the summary immediately after reading the PDF content.

Your goal is to produce an emoji-enhanced, professional, and easy-to-digest summary that fully covers the PDF’s content without any raw markdown artifacts.

`,
        },
      ],
    },
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: text }],
      },
    ],
  });

  const response = await result.response.text();
  console.log("response from the AI 🤖", response);
  return response;
}

export default aiSummary;
