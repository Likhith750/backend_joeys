import express from 'express';
import { createStudent, getStudentByEmail, getAllStudents, updateStudentById } from '../operations/studentOperations';
import { IStudent } from '../models/Student';

const router = express.Router();

// Register a new student
router.post('/register', async (req, res) => {
    const { roll_id, fullName, section, email } = req.body;

    // Basic validation
    if (!roll_id || !fullName || !section || !email) {
        return res.status(400).json({ error: true, message: 'All fields (roll_id, fullName, section, email) are required' });
    }

    const student = await createStudent(roll_id, fullName, section, email);
    if (!student) {
        return res.status(500).json({ error: true, message: 'Error creating student' });
    }
    res.status(201).json({ error: false, message: 'Student registered successfully', student });
});

// Get student section by email
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const result = await getStudentByEmail(email);

        if (result.error) {
            return res.status(404).json({ error: true, message: 'Student not found' });
        }

        res.status(200).json({ error: false, section: result.section });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving student' });
    }
});

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await getAllStudents();
        if (!students || students.length === 0) {
            return res.status(404).json({ error: true, message: 'No students found' });
        }
        res.status(200).json({ error: false, students });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving students' });
    }
});

// Update student details by ID
router.put('/:id', async (req, res) => {
    const { roll_id, fullName, section, email } = req.body;

    // Partial update allowed
    const updateData: Partial<IStudent> = {};
    if (roll_id) updateData.roll_id = roll_id;
    if (fullName) updateData.fullName = fullName;
    if (section) updateData.section = section;
    if (email) updateData.email = email;

    try {
        const updatedStudent = await updateStudentById(req.params.id, updateData);
        if (!updatedStudent) {
            return res.status(404).json({ error: true, message: 'Student not found or update failed' });
        }
        res.status(200).json({ 
            error: false, 
            message: 'Student updated successfully', 
            updatedStudent 
        });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Error updating student' });
    }
});

export default router;
