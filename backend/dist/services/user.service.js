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
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (fullName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield user_1.default.create({
        fullName,
        email,
        password: hashedPassword,
    });
    return user;
});
exports.register = register;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    return user;
});
exports.login = login;
