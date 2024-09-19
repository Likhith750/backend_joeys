// routes/workUpdatesRoutes.ts
import { Router, Request, Response } from 'express';
import { createWorkUpdate, getRecentWorkUpdates } from '../operations/workUpdatesOperations';

const router: Router = Router();

// POST: Create a new work update
router.post('/work-updates/submit', async (req: Request, res: Response) => {
    const { className, details } = req.body;
    try {
        const workUpdate = await createWorkUpdate(className, details);
        res.status(201).json({ message: 'Work update submitted successfully', workUpdate });
    } catch (error) {
        res.status(500).json({ message: 'Failed to submit work update', error });
    }
});

// GET: Retrieve work updates from the last 24 hours
router.get('/work-updates', async (_req: Request, res: Response) => {
    try {
        const workUpdates = await getRecentWorkUpdates();
        res.status(200).json(workUpdates);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve work updates', error });
    }
});

export default router;
