"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = exports.isGuest = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.isGuest = (0, express_async_handler_1.default)((req, res, next) => {
    const user = req.context;
    if (!user) {
        next();
    }
    else {
        res.status(403);
        throw new Error("Forbidden");
    }
});
exports.isAuth = (0, express_async_handler_1.default)((req, res, next) => {
    const user = req.context;
    if (user) {
        next();
    }
    else {
        res.status(403);
        throw new Error("Forbidden");
    }
});
