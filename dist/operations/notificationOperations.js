"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNotifications = exports.createNotification = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// Function to create and store a new notification
const createNotification = (title, message, dateTime) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = new Notification_1.default({
        title,
        message,
        dateTime
    });
    try {
        const savedNotification = yield notification.save();
        return savedNotification;
    }
    catch (error) {
        throw new Error('Error storing notification: ' + error);
    }
});
exports.createNotification = createNotification;
// Function to retrieve all notifications
const getAllNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // Timestamp for 24 hours ago
        const notifications = yield Notification_1.default.find({ createdAt: { $gte: twentyFourHoursAgo } })
            .sort({ createdAt: -1 }); // Sort by latest notifications first
        return notifications;
    }
    catch (error) {
        throw new Error('Error retrieving notifications: ' + error);
    }
});
exports.getAllNotifications = getAllNotifications;
const cleanupOldNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        yield Notification_1.default.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
        console.log('Old notifications cleaned up.');
    }
    catch (error) {
        console.error('Error cleaning up old notifications: ', error);
    }
});
// Schedule this function to run periodically (e.g., every hour)
setInterval(cleanupOldNotifications, 60 * 60 * 1000); // Run every hour
