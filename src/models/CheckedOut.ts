import mongoose, { Document, Schema } from 'mongoose';

export interface ICheckedOut extends Document {
    fullName: string;
    rollId: string;
    date: string;  // Changed from Date to string for consistency with frontend
    status: 'yes' | 'no';
    createdAt: Date;
    updatedAt: Date;
}

const CheckedOutSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    rollId: {
        type: String,
        required: true,
    },
    date: {
        type: String,  // Changed from Date to string
        required: true,
    },
    status: {
        type: String,
        enum: ['yes', 'no'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const CheckedOut = mongoose.model<ICheckedOut>('CheckedOut', CheckedOutSchema);
export default CheckedOut;
