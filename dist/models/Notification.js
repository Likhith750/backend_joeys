"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    dateTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Store the creation time
});
const Notification = mongoose_1.default.model('Notification', notificationSchema);
exports.default = Notification;
