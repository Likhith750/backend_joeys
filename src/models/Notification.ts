import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    dateTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Store the creation time
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
