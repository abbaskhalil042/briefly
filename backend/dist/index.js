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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pdf_1 = require("@langchain/community/document_loaders/fs/pdf");
const user_1 = __importDefault(require("./models/user"));
const pdf_2 = __importDefault(require("./models/pdf"));
const aiSummary_1 = __importDefault(require("./utils/aiSummary"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
// ------------------- Auth Routes ------------------- //
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_1.default.create({
            fullName,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User registered", user });
    }
    catch (error) {
        res.status(500).json({ message: "Registration failed", error });
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res
            .status(200)
            .json({ message: "Login successful", token, userId: user._id });
    }
    catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
}));
// ------------------- PDF Routes ------------------- //
app.post("/pdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { original_file, summary_text, userId } = req.body;
    try {
        const pdfLoader = new pdf_1.PDFLoader(original_file);
        const pdfDocs = yield pdfLoader.load();
        const summary = yield (0, aiSummary_1.default)(pdfDocs[0].pageContent);
        const pdf = yield pdf_2.default.create({
            original_file,
            summary_text: summary,
            user: userId,
        });
        res.status(201).json({ message: "PDF saved", pdf });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to save PDF", error });
    }
}));
app.get("/pdf/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdfs = yield pdf_2.default.find({ user: req.params.userId });
        res.status(200).json(pdfs);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get PDFs", error });
    }
}));
// ------------------- Start Server ------------------- //
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
