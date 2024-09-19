// operations/UserOperations.ts

import User, { IUser } from '../models/User';
import crypto from 'crypto';

// Function to create a new user with fullname included
export const createUser = async (
    username: string, 
    email: string, 
    password: string, 
    role: 'admin' | 'teacher' | 'student',
    fullname: string  // Added fullname as a parameter
): Promise<IUser | null> => {
    try {
        const user = new User({ username, email, password, role, fullname });  // Include fullname in user creation
        await user.save();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

// Function to handle user login
export const userLogin = async (email: string, password: string): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return null;
        return user;
    } catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
};

// Function to get a user by email or fullName
export const getUserDetails = async (identifier: string): Promise<IUser | null> => {
    try {
        // Search by email or fullName
        const user = await User.findOne({
            $or: [{ email: identifier }, { fullname: identifier }]
        });
        return user;
    } catch (error) {
        console.error('Error getting user details:', error);
        return null;
    }
};

// Change password
export const changePassword = async (
    email: string,
    oldPassword: string,
    newPassword: string
): Promise<IUser | null> => {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return null;

        await user.changePassword(newPassword);
        return user;
    } catch (error) {
        console.error('Error changing user password:', error);
        return null;
    }
};

// Generate a random 4-digit OTP
const generateOTP = (): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Send OTP to user's email
export const sendOtp = async (email: string): Promise<{ success: boolean }> => {
    try {
        const user = await User.findOne({ email });
        if (!user) return { success: false };

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        // Send OTP to the user's email address
        // Replace with actual email sending logic
        console.log(`OTP sent to ${email}: ${otp}`);
        return { success: true };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false };
    }
};

// Validate the OTP
export const validateOtp = async (email: string, otp: string): Promise<{ success: boolean }> => {
    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || !user.otpExpiry || new Date() > user.otpExpiry) {
            return { success: false };
        }

        // Clear OTP after validation
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        return { success: true };
    } catch (error) {
        console.error('Error validating OTP:', error);
        return { success: false };
    }
};

// Reset password without using a token
export const resetPassword = async (
    email: string,
    newPassword: string
): Promise<{ success: boolean }> => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false };
        }

        await user.changePassword(newPassword);

        return { success: true };
    } catch (error) {
        console.error('Error resetting user password:', error);
        return { success: false };
    }
};
