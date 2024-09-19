import express from 'express';
import { createDailyReports, getAllReports, getLatestReportByStudentName } from '../operations/dailyReportOperations';
import { IDailyReport } from '../models/DailyReport';

const router = express.Router();

// Route to submit multiple daily reports
router.post('/submit', async (req, res) => {
  try {
    const reportsData: Omit<IDailyReport, '_id'>[] = req.body;
    const reports = await createDailyReports(reportsData);
    res.status(201).json(reports);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

// Route to fetch all daily reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await getAllReports();
    res.status(200).json(reports);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});

// Route to fetch daily reports by student name
// Route to fetch the latest daily report by student name
router.get('/reports/by-student/:name', async (req, res) => {
  const studentName = req.params.name;
  try {
    const latestReport = await getLatestReportByStudentName(studentName);
    if (latestReport) {
      res.status(200).json(latestReport);
    } else {
      res.status(404).json({ message: 'No report found for the specified student.' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
});


export default router;