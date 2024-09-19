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
const express_1 = __importDefault(require("express"));
const notificationOperations_1 = require("../operations/notificationOperations");
const router = express_1.default.Router();
// Route to send a notification and store it in the database
router.post('/sendNotification', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, dateTime } = req.body;
    try {
        const newNotification = yield (0, notificationOperations_1.createNotification)(title, message, dateTime);
        res.status(200).json({ message: 'Notification stored successfully', notification: newNotification });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred while storing notification' });
        }
    }
}));
// Route to retrieve all notifications
router.get('/notifications', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield (0, notificationOperations_1.getAllNotifications)();
        res.status(200).json(notifications);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred while retrieving notifications' });
        }
    }
}));
exports.default = router;
