"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/joeys_db',
    JWT_SECRET: process.env.JWT_SECRET || '',
    PORT: process.env.PORT || 5000,
};
