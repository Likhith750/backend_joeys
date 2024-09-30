import Otp, { IOtp } from '../models/otp.model';
import nodemailer from 'nodemailer';

// Save OTP to the database (Frontend sends the OTP)
export const saveOtp = async (email: string, otp: string): Promise<IOtp> => {
    const expiresIn = 10 * 60 * 1000; // OTP expires in 10 minutes
    const otpEntry = new Otp({
        email,
        otp,
        expiresAt: new Date(Date.now() + expiresIn)
    });
    return await otpEntry.save();
};

// Verify OTP
export const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
        return false;
    }
    // Check if OTP is still valid
    return new Date() < otpEntry.expiresAt;
};

// Clean up old OTPs for a particular email
export const deleteOtpByEmail = async (email: string): Promise<void> => {
    await Otp.deleteMany({ email });
};

// Function to send OTP via email
export const sendOtpEmail = async (email: string, otp: string) => {
    try {
        // Create a transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'joeysjoeys96@gmail.com', // Your Gmail email
                pass: 'anrk rimv mcqk wnci', // App-specific password (use App Passwords for Gmail)
            },
        });

        // Email options
        const mailOptions = {
            from: 'joeysjoeys96@gmail.com', // Sender email
            to: email, // Receiver's email
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};
