import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
    fullName: string;
    rollId: string;
    date: string;  // Changed from Date to string for consistency with frontend
    status: 'present' | 'absent';
    createdAt: Date;
    updatedAt: Date;
}

const AttendanceSchema: Schema = new Schema({
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
        enum: ['present', 'absent'],
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

const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
export default Attendance;
