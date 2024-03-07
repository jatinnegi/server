"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOrigin = exports.isDevelopment = void 0;
exports.isDevelopment = process.env.NODE_ENV === "development";
exports.allowedOrigin = exports.isDevelopment
    ? "http://localhost:3000"
    : "stackdrive-client.vercel.app";
