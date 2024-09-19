import { Router, Request, Response } from 'express';
import { createCircleTimeReport, getCircleTimeReports, getCircleTimeReportByClassName } from '../operations/circleTimeOperations';

const router = Router();

// Route to create a new circle time report
router.post('/circle-time-reports', async (req: Request, res: Response) => {
    try {
        const { className, circleTimeDetails } = req.body;

        if (!className || !circleTimeDetails) {
            res.status(400).json({ message: 'Class name and circle time details are required' });
            return;
        }

        await createCircleTimeReport(className, circleTimeDetails);

        res.status(201).json({ message: 'Circle time report submitted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

// Route to get all circle time reports
router.get('/circle-time-reports', async (req: Request, res: Response) => {
    try {
        const reports = await getCircleTimeReports();
        res.status(200).json(reports);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

// Route to get a circle time report by className
router.get('/circle-time-reports/:className', async (req: Request, res: Response) => {
    try {
        const { className } = req.params;

        if (!className) {
            res.status(400).json({ message: 'Class name is required' });
            return;
        }

        const report = await getCircleTimeReportByClassName(className);

        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

export default router;
