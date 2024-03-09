"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = exports.notFoundMiddleware = exports.authMiddleware = void 0;
const utils_1 = require("../utils");
const User_model_1 = __importDefault(require("../models/User.model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const config_1 = require("../config");
exports.authMiddleware = (0, express_async_handler_1.default)(async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if (token) {
            const { id } = (0, utils_1.jwtVerify)(token);
            if (!id) {
                next();
            }
            else {
                const user = await User_model_1.default.findById(id);
                req.context = user;
                next();
            }
        }
        else {
            next();
        }
    }
    catch (err) {
        console.error(err);
        res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
        next();
    }
});
const notFoundMiddleware = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFoundMiddleware = notFoundMiddleware;
const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const error = err.message;
    res.status(statusCode).json({
        error,
        stack: config_1.isDevelopment ? err.stack : null,
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
