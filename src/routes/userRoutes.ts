import express from 'express';
import { createUser, userLogin, getUserDetails, changePassword, resetPassword } from '../operations/userOperations';

const router = express.Router();

// Register a new user with a role and fullname
router.post('/register', async (req, res) => {
    const { username, email, password, role, fullname } = req.body;
    const user = await createUser(username, email, password, role, fullname);
    if (!user) {
        return res.status(400).json({ error: true, message: 'User already exists or error occurred' });
    }
    res.status(201).json({ error: false, message: 'User registered successfully', user });
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userLogin(email, password);
    if (!user) {
        return res.status(400).json({ error: true, message: 'Invalid email or password' });
    }
    res.status(200).json({ error: false, message: 'Login successful', user });
});

// Get user details by email or fullname
router.get('/user/:identifier', async (req, res) => {
    const { identifier } = req.params;
    const user = await getUserDetails(identifier);
    if (!user) {
        return res.status(404).json({ error: true, message: 'User not found' });
    }
    res.status(200).json({ error: false, fullName: user.fullname });
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

// Reset password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    const { success } = await resetPassword(email, newPassword);
    if (!success) {
        return res.status(400).json({ error: true, message: 'User not found or error resetting password' });
    }
    res.status(200).json({ error: false, message: 'Password reset successfully', success: true });
});

export default router;
