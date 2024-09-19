import mongoose, { Document, Schema } from 'mongoose';

export interface IToiletUsage extends Document {
    rollId: string;
    fullName: string;  // Updated from 'name' to 'fullName'
    description: string;
    date: string;  // Added date field
}

const ToiletUsageSchema: Schema = new Schema({
    rollId: {
        type: String,
        required: true,
    },
    fullName: {  // Updated field name
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {  // Added date field
        type: String,
        required: true,
    },
}, { timestamps: true });

const ToiletUsage = mongoose.model<IToiletUsage>('ToiletUsage', ToiletUsageSchema);

export default ToiletUsage;
