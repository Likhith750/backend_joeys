import express from 'express';
import { createFeedback, getAllFeedbacks } from '../controllers/feedback.controller';

const router = express.Router();

// POST route to submit feedback
router.post('/feedback', createFeedback);

// GET route to retrieve all feedbacks (optional, for admin)
router.get('/feedbacks', getAllFeedbacks);

export default router;