"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.update = exports.register = exports.login = exports.getUser = void 0;
const utils_1 = require("../utils");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_model_1 = __importDefault(require("../models/User.model"));
exports.getUser = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.context;
    if (!id) {
        throw new Error("No user ID found");
    }
    const user = await User_model_1.default.findById(id);
    res.status(200).json(user);
});
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await User_model_1.default.findOne({ email });
    if (!user || !user.comparePassword(password)) {
        res.status(404);
        throw new Error("Invalid credentials");
    }
    (0, utils_1.generateAuthToken)(user._id.toString(), res);
    await (0, utils_1.wait)(3500);
    res.status(200).json(user);
});
exports.register = (0, express_async_handler_1.default)(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await User_model_1.default.create({
        firstName,
        lastName,
        email,
        password,
    });
    (0, utils_1.generateAuthToken)(user._id.toString(), res);
    res.status(201).json(user);
});
exports.update = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.context;
    const { countryCode, phoneNumber, city, state, address, zipCode } = req.body;
    const user = await User_model_1.default.findById(id);
    if (!user) {
        throw new Error("No user found");
    }
    user.countryCode = countryCode || user.countryCode;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.city = city || user.city;
    user.state = state || user.state;
    user.address = address || user.address;
    user.zipCode = zipCode || user.zipCode;
    await user.save();
    await (0, utils_1.wait)(3500);
    res.status(200).json(user);
});
exports.logout = (0, express_async_handler_1.default)((req, res) => {
    res.cookie("jwt", "", { expires: new Date(0) });
    res.status(200).json({ message: "User logged out" });
});
