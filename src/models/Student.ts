import mongoose, { Document, Schema } from 'mongoose';

export interface IStudent extends Document {
    roll_id: string;
    fullName: string;
    section: 'primary' | 'pre-primary';
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const StudentSchema: Schema = new Schema({
    roll_id: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        enum: ['primary', 'pre-primary'],
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assuming email needs to be unique
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

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
