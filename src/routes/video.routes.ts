// routes/video.routes.ts
import { Router } from 'express';
import { createVideo, getLatestVideo } from '../controllers/video.controller';

const router = Router();

// Route to create video URL
router.post('/_video', createVideo);

// Route to get the latest video URL
router.get('/_video', getLatestVideo);

export default router;