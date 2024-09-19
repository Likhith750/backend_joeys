import mongoose, { Schema, Document } from 'mongoose';

export interface IChildObservation extends Document {
    fullName: string;
    rollId: string;
    date: string; // Store date as a string for consistency with the frontend
    description: string;
    createdAt?: Date; // These will be automatically managed by Mongoose
    updatedAt?: Date; // These will be automatically managed by Mongoose
}

const ChildObservationSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    rollId: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true }); // This option automatically handles 'createdAt' and 'updatedAt'

export default mongoose.model<IChildObservation>('ChildObservation', ChildObservationSchema);
