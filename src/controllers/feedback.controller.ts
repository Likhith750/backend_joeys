import { Request, Response } from 'express';
import Feedback from '../models/Feedback';  // Adjust the path as necessary

// Create new feedback
export const createFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fullName, className, role, feedbackText } = req.body;

        const newFeedback = new Feedback({
            fullName,
            className,
            role,
            feedbackText,
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
};

// Get all feedbacks (optional, for admin purposes)
export const getAllFeedbacks = async (req: Request, res: Response): Promise<void> => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedbacks', error });
    }
};