// routes/userRoutes.ts

import express from 'express';
import { createUser, userLogin, getUserDetails, changePassword, sendOtp, validateOtp, resetPassword } from '../operations/userOperations';

const router = express.Router();

// Register a new user with a role and fullname
router.post('/register', async (req, res) => {
    const { username, email, password, role, fullname } = req.body; // Include fullname in the request body
    const user = await createUser(username, email, password, role, fullname); // Pass fullname to createUser
    if (!user) {
        return res.status(400).json({ error: true, message: 'User already exists or error occurred' });
    }
    res.status(201).json({ error: false, message: 'User registered successfully', user });
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userLogin(email, password);
    console.log(user);
    if (!user) {
        return res.status(400).json({ error: true, message: 'Invalid email or password' });
    }
    res.status(200).json({ error: false, message: 'Login successful', user });
});

// Get user details by email or fullName
router.get('/user/:identifier', async (req, res) => {
    const { identifier } = req.params;  // Email or fullName from the route
    const user = await getUserDetails(identifier); // Get user details
    if (!user) {
        return res.status(404).json({ error: true, message: 'User not found' });
    }
    res.status(200).json({ error: false, fullName: user.fullname }); // Send only fullName
});

// Change password
router.post('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({ error: true, message: 'All fields are required' });
    }

    try {
        const user = await changePassword(email, oldPassword, newPassword);
        if (!user) {
            return res.status(400).json({ error: true, message: 'Invalid email or password' });
        }
        res.status(200).json({ error: false, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error in /change-password route:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const { success } = await sendOtp(email); // Destructure success from the response
    if (!success) {
        return res.status(400).json({ error: true, message: 'Failed to send OTP or user does not exist' });
    }
    res.status(200).json({ error: false, message: 'OTP sent successfully', success: true });
});

// Validate OTP
router.post('/validate-otp', async (req, res) => {
    const { email, otp } = req.body;
    const { success } = await validateOtp(email, otp); // Destructure success from the response
    if (!success) {
        return res.status(400).json({ error: true, message: 'Invalid OTP or OTP expired' });
    }
    res.status(200).json({ error: false, message: 'OTP validated successfully', success: true });
});

// Reset password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body; // No token needed now
    const { success } = await resetPassword(email, newPassword); // Destructure success from the response
    if (!success) {
        return res.status(400).json({ error: true, message: 'User not found or error resetting password' });
    }
    res.status(200).json({ error: false, message: 'Password reset successfully', success: true });
});

export default router;
