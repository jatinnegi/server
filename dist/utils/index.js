"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.generateAuthToken = exports.cleanErrors = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cleanErrors = (errors) => {
    const cleanedErrors = {};
    for (const error of errors) {
        cleanedErrors[error.path] = error.msg;
    }
    return cleanedErrors;
};
exports.cleanErrors = cleanErrors;
const generateAuthToken = (id, res) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: !config_1.isDevelopment,
        sameSite: "strict",
        maxAge: 30 * 60 * 1000,
    });
};
exports.generateAuthToken = generateAuthToken;
const jwtVerify = (accessToken) => {
    const payload = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return payload;
};
exports.jwtVerify = jwtVerify;
