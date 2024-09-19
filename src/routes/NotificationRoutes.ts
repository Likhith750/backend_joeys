import express from 'express';
import { createNotification, getAllNotifications } from '../operations/notificationOperations';

const router = express.Router();

// Route to send a notification and store it in the database
router.post('/sendNotification', async (req, res) => {
    const { title, message, dateTime } = req.body;

    try {
        const newNotification = await createNotification(title, message, dateTime);
        res.status(200).json({ message: 'Notification stored successfully', notification: newNotification });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred while storing notification' });
        }
    }
});

// Route to retrieve all notifications
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await getAllNotifications();
        res.status(200).json(notifications);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred while retrieving notifications' });
        }
    }
});

export default router;
