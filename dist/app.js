"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lib_routes_1 = __importDefault(require("./app/routes/lib.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", lib_routes_1.default);
exports.default = app;
