"use strict";
// operations/UserOperations.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.validateOtp = exports.sendOtp = exports.changePassword = exports.getUserDetails = exports.userLogin = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// Function to create a new user with fullname included
const createUser = (username, email, password, role, fullname // Added fullname as a parameter
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new User_1.default({ username, email, password, role, fullname }); // Include fullname in user creation
        yield user.save();
        return user;
    }
    catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
});
exports.createUser = createUser;
// Function to handle user login
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return null;
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            return null;
        return user;
    }
    catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
});
exports.userLogin = userLogin;
// Function to get a user by email or fullName
const getUserDetails = (identifier) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Search by email or fullName
        const user = yield User_1.default.findOne({
            $or: [{ email: identifier }, { fullname: identifier }]
        });
        return user;
    }
    catch (error) {
        console.error('Error getting user details:', error);
        return null;
    }
});
exports.getUserDetails = getUserDetails;
// Change password
const changePassword = (email, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return null;
        const isMatch = yield user.comparePassword(oldPassword);
        if (!isMatch)
            return null;
        yield user.changePassword(newPassword);
        return user;
    }
    catch (error) {
        console.error('Error changing user password:', error);
        return null;
    }
});
exports.changePassword = changePassword;
// Generate a random 4-digit OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};
// Send OTP to user's email
const sendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return { success: false };
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        yield user.save();
        // Send OTP to the user's email address
        // Replace with actual email sending logic
        console.log(`OTP sent to ${email}: ${otp}`);
        return { success: true };
    }
    catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false };
    }
});
exports.sendOtp = sendOtp;
// Validate the OTP
const validateOtp = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user || user.otp !== otp || !user.otpExpiry || new Date() > user.otpExpiry) {
            return { success: false };
        }
        // Clear OTP after validation
        user.otp = undefined;
        user.otpExpiry = undefined;
        yield user.save();
        return { success: true };
    }
    catch (error) {
        console.error('Error validating OTP:', error);
        return { success: false };
    }
});
exports.validateOtp = validateOtp;
// Reset password without using a token
const resetPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return { success: false };
        }
        yield user.changePassword(newPassword);
        return { success: true };
    }
    catch (error) {
        console.error('Error resetting user password:', error);
        return { success: false };
    }
});
exports.resetPassword = resetPassword;
