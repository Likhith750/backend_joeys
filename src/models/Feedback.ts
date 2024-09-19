import mongoose, { Schema, Document } from 'mongoose';

interface IFeedback extends Document {
    fullName: string;
    className: string;
    role: string;
    feedbackText: string;
    createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    className: { type: String, required: true },
    role: { type: String, required: true },
    feedbackText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;