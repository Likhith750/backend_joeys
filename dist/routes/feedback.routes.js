"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("../controllers/feedback.controller");
const router = express_1.default.Router();
// POST route to submit feedback
router.post('/feedback', feedback_controller_1.createFeedback);
// GET route to retrieve all feedbacks (optional, for admin)
router.get('/feedbacks', feedback_controller_1.getAllFeedbacks);
exports.default = router;
