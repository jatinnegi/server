"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOrigin = exports.isDevelopment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.isDevelopment = process.env.NODE_ENV === "development";
exports.allowedOrigin = exports.isDevelopment
    ? "http://localhost:3000"
    : "https://stackdrive-client.vercel.app";
