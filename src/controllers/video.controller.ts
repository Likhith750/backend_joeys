// controllers/video.controller.ts
import { Request, Response } from 'express';
import Video from '../models/video.model';

export const createVideo = async (req: Request, res: Response) => {
    try {
        const { videoUrl } = req.body;
        const video = new Video({ videoUrl });
        await video.save();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: 'Error saving video URL', error });
    }
};

export const getLatestVideo = async (req: Request, res: Response) => {
    try {
        const video = await Video.findOne().sort({ _id: -1 });
        if (video) {
            res.json(video);
        } else {
            res.status(404).json({ message: 'No video URL found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video URL', error });
    }
};