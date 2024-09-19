// models/WorkUpdates.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkUpdates extends Document {
    className: string;
    details: string;
    createdAt: Date;
}

const WorkUpdatesSchema: Schema = new Schema({
    className: { type: String, required: true },
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWorkUpdates>('WorkUpdates', WorkUpdatesSchema);