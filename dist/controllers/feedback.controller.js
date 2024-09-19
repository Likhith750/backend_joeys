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
exports.getAllFeedbacks = exports.createFeedback = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback")); // Adjust the path as necessary
// Create new feedback
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, className, role, feedbackText } = req.body;
        const newFeedback = new Feedback_1.default({
            fullName,
            className,
            role,
            feedbackText,
        });
        yield newFeedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
});
exports.createFeedback = createFeedback;
// Get all feedbacks (optional, for admin purposes)
const getAllFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedbacks = yield Feedback_1.default.find();
        res.status(200).json(feedbacks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving feedbacks', error });
    }
});
exports.getAllFeedbacks = getAllFeedbacks;
