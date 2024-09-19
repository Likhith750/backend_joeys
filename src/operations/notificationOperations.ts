import Notification from '../models/Notification';

// Function to create and store a new notification
export const createNotification = async (title: string, message: string, dateTime: string) => {
    const notification = new Notification({
        title,
        message,
        dateTime
    });

    try {
        const savedNotification = await notification.save();
        return savedNotification;
    } catch (error) {
        throw new Error('Error storing notification: ' + error);
    }
};

// Function to retrieve all notifications
export const getAllNotifications = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // Timestamp for 24 hours ago
        const notifications = await Notification.find({ createdAt: { $gte: twentyFourHoursAgo } })
                                                .sort({ createdAt: -1 }); // Sort by latest notifications first
        return notifications;
    } catch (error) {
        throw new Error('Error retrieving notifications: ' + error);
    }
};

const cleanupOldNotifications = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await Notification.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
        console.log('Old notifications cleaned up.');
    } catch (error) {
        console.error('Error cleaning up old notifications: ', error);
    }
};

// Schedule this function to run periodically (e.g., every hour)
setInterval(cleanupOldNotifications, 60 * 60 * 1000); // Run every hour