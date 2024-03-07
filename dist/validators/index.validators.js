"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterValidation = exports.UserLoginValidation = void 0;
const express_validator_1 = require("express-validator");
const utils_1 = require("../utils");
const User_model_1 = __importDefault(require("../models/User.model"));
const withValidation = (validations) => async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const cleanedErrors = (0, utils_1.cleanErrors)(errors.array());
        return res.status(400).json({
            type: "VaidationErrors",
            errors: cleanedErrors,
        });
    }
    next();
};
exports.UserLoginValidation = [
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.UserRegisterValidation = [
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("email").custom((value) => {
        return new Promise(async (resolve, reject) => {
            const user = await User_model_1.default.findOne({ email: value });
            if (user) {
                reject(new Error("Email is already taken"));
            }
            else {
                resolve(true);
            }
        });
    }),
    (0, express_validator_1.body)("email").isEmail().withMessage("Enter a valid email"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters long"),
];
exports.default = withValidation;
