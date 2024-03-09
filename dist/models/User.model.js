"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
        default: "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "",
    },
    country: {
        type: String,
        required: false,
        default: "",
    },
    state: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    zipCode: { type: String, required: false, default: "" },
}, {
    timestamps: true,
});
UserSchema.methods.comparePassword = function (password) {
    const hashedPassword = this.password;
    const match = bcrypt_1.default.compareSync(password, hashedPassword);
    return match;
};
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
UserSchema.pre("save", async function (next) {
    const hashedPassword = bcrypt_1.default.hashSync(this.password, 10);
    this.password = hashedPassword;
    next();
});
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
