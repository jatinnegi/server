"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_middleware_1 = require("./middlewares/index.middleware");
const index_route_1 = __importDefault(require("./routes/index.route"));
const connect_1 = __importDefault(require("./db/connect"));
const config_1 = require("./config");
dotenv_1.default.config();
(0, connect_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: config_1.allowedOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(index_middleware_1.authMiddleware);
app.get("/", (req, res) => {
    res.status(200).json({ message: "StackDrive Restful API 🚀" });
});
app.use("/api", index_route_1.default);
app.use(index_middleware_1.notFoundMiddleware);
app.use(index_middleware_1.errorHandlerMiddleware);
exports.PORT = process.env.PORT;
exports.default = app;
