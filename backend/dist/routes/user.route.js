"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
userRouter.post("/register", user_controller_1.Register);
userRouter.post("/login", user_controller_1.Login);
userRouter.get("/me", auth_1.auth, user_controller_1.getMe);
exports.default = userRouter;
