import { Router, Request, Response } from 'express';
import { createReport, getReports, getLatestReportByClassName } from '../operations/childDailyReportOperations';

const router = Router();

// Route to create a new daily report
router.post('/reports', async (req: Request, res: Response) => {
    try {
        const { className, reportDetails } = req.body;

        if (!className || !reportDetails) {
            res.status(400).json({ message: 'Class name and report details are required' });
            return;
        }

        await createReport(className, reportDetails);

        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

// Route to get all daily reports (optional)
router.get('/reports', async (req: Request, res: Response) => {
    try {
        const reports = await getReports();
        res.status(200).json(reports);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

// Route to get the latest report by className
router.get('/reports/:className', async (req: Request, res: Response) => {
    try {
        const { className } = req.params;
        const report = await getLatestReportByClassName(className);

        if (!report) {
            return res.status(404).json({ message: 'No reports found for this class' });
        }

        res.status(200).json(report);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});

export default router;
