import express, { Request, Response } from 'express';
import multer from 'multer';
import Audio from '../models/Audio';
import fs from 'fs';

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// POST route to upload the audio file
router.post('/upload_audio', upload.single('audioFile'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, mimetype, buffer } = req.file;

        const base64Data = buffer.toString('base64');

        const audio = new Audio({
            filename: originalname,
            contentType: mimetype,
            audioData: base64Data,
        });

        await audio.save();

        console.log("Audio uploaded:", audio);

        res.status(201).json({ message: 'Audio uploaded successfully', audioId: audio._id });
    } catch (error) {
        console.error('Error uploading audio:', error);
        res.status(500).json({ error: 'Failed to upload audio' });
    }
});

// GET route to retrieve the latest audio file
router.get('/audio/latest', async (req: Request, res: Response) => {
    try {
        console.log("Fetching the latest audio file...");

        const audio = await Audio.findOne().sort({ createdAt: -1 }); // Sorting by the `createdAt` timestamp

        if (!audio) {
            console.error("No audio file found.");
            return res.status(404).json({ error: 'Audio file not found' });
        }

        console.log("Latest audio found:", audio);

        const audioBuffer = Buffer.from(audio.audioData, 'base64');

        // Save buffer to file for debugging (optional)
        fs.writeFileSync('debug_audio_file.wav', audioBuffer);

        res.setHeader('Content-Type', audio.contentType);
        res.send(audioBuffer);
    } catch (error) {
        console.error('Error retrieving audio:', error);
        res.status(500).json({ error: 'Failed to retrieve audio' });
    }
});

export default router;