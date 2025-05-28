"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const db_1 = __importDefault(require("./config/db"));
const pdf_route_1 = __importDefault(require("./routes/pdf.route"));
const payment_route_1 = __importDefault(require("./routes/payment.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "secret";
app.use("/api/v1/auth", user_route_1.default);
app.use("/api/v1/pdf", pdf_route_1.default);
app.use("/api/v1/payment", payment_route_1.default);
app.listen(PORT, () => {
    (0, db_1.default)();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
