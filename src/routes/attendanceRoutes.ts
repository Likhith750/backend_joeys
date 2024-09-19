import express from 'express';
import { postAttendance, getAttendanceByFullName } from '../operations/attendanceOperations';

const router = express.Router();

// Post attendance
router.post('/post', async (req, res) => {
    const attendances = req.body; // Expecting an array of attendance objects

    if (!Array.isArray(attendances) || attendances.length === 0) {
        return res.status(400).json({ error: true, message: 'Attendance data must be an array and cannot be empty' });
    }

    const savedAttendances = await postAttendance(attendances);
    if (!savedAttendances) {
        return res.status(400).json({ error: true, message: 'Error posting attendance' });
    }
    res.status(201).json({ error: false, message: 'Attendance posted successfully', savedAttendances });
});

// Get attendance by full name
router.get('/:fullname', async (req, res) => {
    const { fullname } = req.params;

    try {
        console.log(`Searching for fullName: ${fullname}`);
        const attendanceRecords = await getAttendanceByFullName(fullname);
        
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ error: true, message: 'No attendance records found' });
        }

        res.status(200).json({ error: false, attendanceRecords });
    } catch (error) {
        console.error('Error retrieving attendance records:', error);
        res.status(500).json({ error: true, message: 'An error occurred while retrieving the records' });
    }
});

export default router;