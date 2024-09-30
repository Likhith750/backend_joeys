import { Router, Request, Response } from 'express';
import { saveOtp, verifyOtp, deleteOtpByEmail ,sendOtpEmail} from '../operations/otp.operations';

const router = Router();

// POST /store-otp
router.post('/store-otp', async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        // Save OTP sent from the frontend
        await saveOtp(email, otp);
        await sendOtpEmail(email, otp);
        return res.status(200).json({ message: 'OTP stored successfully' });
    } catch (error) {
        console.error('Error storing OTP:', error);
        return res.status(500).json({ message: 'Failed to store OTP' });
    }
});

// POST /verify-otp
router.post('/verify-otp', async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        const isValid = await verifyOtp(email, otp);

        if (isValid) {
            // Optionally, delete OTP after successful verification
            await deleteOtpByEmail(email);
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP or OTP has expired' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Failed to verify OTP' });
    }
});

export default router;
