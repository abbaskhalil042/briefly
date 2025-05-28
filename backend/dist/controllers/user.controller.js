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
exports.getMe = exports.Login = exports.Register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const user_service_1 = require("../services/user.service");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const user = yield (0, user_service_1.register)(name, email, password);
        res.status(201).json({ message: "User registered", user });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Registration failed", error });
    }
});
exports.Register = Register;
//*login
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        console.log(email, password);
        const user = yield (0, user_service_1.login)(email, password);
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
        res.status(200).json({ message: "Login successful", token, user });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Login failed", error });
    }
});
exports.Login = Login;
// GET /api/v1/user/me
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.user).select("-password");
    res.status(200).json({ user });
});
exports.getMe = getMe;
