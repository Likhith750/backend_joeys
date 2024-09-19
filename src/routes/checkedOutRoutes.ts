import express from 'express';
import { postCheckedOut, getCheckedOutByFullName } from '../operations/checkedOutOperations';

const router = express.Router();

// Post checked-out records
router.post('/post', async (req, res) => {
    const checkedOuts = req.body; // Expecting an array of checked-out objects

    if (!Array.isArray(checkedOuts) || checkedOuts.length === 0) {
        return res.status(400).json({ error: true, message: 'Checked-out data must be an array and cannot be empty' });
    }

    const savedCheckedOuts = await postCheckedOut(checkedOuts);
    if (!savedCheckedOuts) {
        return res.status(400).json({ error: true, message: 'Error posting checked-out records' });
    }
    res.status(201).json({ error: false, message: 'Checked-out records posted successfully', savedCheckedOuts });
});

// Get checked-out records by full name
router.get('/:fullname', async (req, res) => {
    const { fullname } = req.params;

    try {
        console.log(`Searching for fullName: ${fullname}`);
        const checkedOutRecords = await getCheckedOutByFullName(fullname);
        
        if (!checkedOutRecords || checkedOutRecords.length === 0) {
            return res.status(404).json({ error: true, message: 'No checked-out records found' });
        }

        res.status(200).json({ error: false, checkedOutRecords });
    } catch (error) {
        console.error('Error retrieving checked-out records:', error);
        res.status(500).json({ error: true, message: 'An error occurred while retrieving the records' });
    }
});

export default router;
