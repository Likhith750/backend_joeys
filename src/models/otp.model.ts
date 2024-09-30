import mongoose, { Document, Schema } from 'mongoose';

// Define the OTP data interface
export interface IOtp extends Document {
    email: string;
    otp: string;
    createdAt: Date;
    expiresAt: Date;
}

// Create the schema for OTP
const OtpSchema: Schema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});

// Define index to remove expired documents
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create the OTP model
const Otp = mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;
