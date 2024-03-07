"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = connect;
