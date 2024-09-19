"use strict";
// routes/userRoutes.ts
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
const express_1 = __importDefault(require("express"));
const userOperations_1 = require("../operations/userOperations");
const router = express_1.default.Router();
// Register a new user with a role and fullname
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role, fullname } = req.body; // Include fullname in the request body
    const user = yield (0, userOperations_1.createUser)(username, email, password, role, fullname); // Pass fullname to createUser
    if (!user) {
        return res.status(400).json({ error: true, message: 'User already exists or error occurred' });
    }
    res.status(201).json({ error: false, message: 'User registered successfully', user });
}));
// User login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, userOperations_1.userLogin)(email, password);
    console.log(user);
    if (!user) {
        return res.status(400).json({ error: true, message: 'Invalid email or password' });
    }
    res.status(200).json({ error: false, message: 'Login successful', user });
}));
// Get user details by email or fullName
router.get('/user/:identifier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.params; // Email or fullName from the route
    const user = yield (0, userOperations_1.getUserDetails)(identifier); // Get user details
    if (!user) {
        return res.status(404).json({ error: true, message: 'User not found' });
    }
    res.status(200).json({ error: false, fullName: user.fullname }); // Send only fullName
}));
// Change password
router.post('/change-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ error: true, message: 'All fields are required' });
    }
    try {
        const user = yield (0, userOperations_1.changePassword)(email, oldPassword, newPassword);
        if (!user) {
            return res.status(400).json({ error: true, message: 'Invalid email or password' });
        }
        res.status(200).json({ error: false, message: 'Password changed successfully' });
    }
    catch (error) {
        console.error('Error in /change-password route:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
}));
// Send OTP
router.post('/send-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { success } = yield (0, userOperations_1.sendOtp)(email); // Destructure success from the response
    if (!success) {
        return res.status(400).json({ error: true, message: 'Failed to send OTP or user does not exist' });
    }
    res.status(200).json({ error: false, message: 'OTP sent successfully', success: true });
}));
// Validate OTP
router.post('/validate-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const { success } = yield (0, userOperations_1.validateOtp)(email, otp); // Destructure success from the response
    if (!success) {
        return res.status(400).json({ error: true, message: 'Invalid OTP or OTP expired' });
    }
    res.status(200).json({ error: false, message: 'OTP validated successfully', success: true });
}));
// Reset password
router.post('/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body; // No token needed now
    const { success } = yield (0, userOperations_1.resetPassword)(email, newPassword); // Destructure success from the response
    if (!success) {
        return res.status(400).json({ error: true, message: 'User not found or error resetting password' });
    }
    res.status(200).json({ error: false, message: 'Password reset successfully', success: true });
}));
exports.default = router;
