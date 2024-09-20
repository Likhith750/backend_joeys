import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'teacher' | 'student';
    fullname: string;
    otp?: string;
    otpExpiry?: Date;
    resetPasswordToken?: string;
    resetPasswordExpiry?: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    changePassword(newPassword: string): Promise<void>;
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
    fullname: { type: String, required: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: Date },
});

// Pre-save middleware to hash the password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to hash and set a new password
UserSchema.methods.changePassword = async function(newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    this.password = hashedPassword;
    await this.save();
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;

