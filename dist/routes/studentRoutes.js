"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentOperations_1 = require("../operations/studentOperations");
const router = express_1.default.Router();
// Register a new student
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roll_id, fullName, section, email } = req.body;
    // Basic validation
    if (!roll_id || !fullName || !section || !email) {
        return res.status(400).json({ error: true, message: 'All fields (roll_id, fullName, section, email) are required' });
    }
    const student = yield (0, studentOperations_1.createStudent)(roll_id, fullName, section, email);
    if (!student) {
        return res.status(500).json({ error: true, message: 'Error creating student' });
    }
    res.status(201).json({ error: false, message: 'Student registered successfully', student });
}));
// Get student section by email
router.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const result = yield (0, studentOperations_1.getStudentByEmail)(email);
        if (result.error) {
            return res.status(404).json({ error: true, message: 'Student not found' });
        }
        res.status(200).json({ error: false, section: result.section });
    }
    catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving student' });
    }
}));
// Get all students
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, studentOperations_1.getAllStudents)();
        if (!students || students.length === 0) {
            return res.status(404).json({ error: true, message: 'No students found' });
        }
        res.status(200).json({ error: false, students });
    }
    catch (error) {
        res.status(500).json({ error: true, message: 'Error retrieving students' });
    }
}));
// Update student details by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { roll_id, fullName, section, email } = req.body;
    // Partial update allowed
    const updateData = {};
    if (roll_id)
        updateData.roll_id = roll_id;
    if (fullName)
        updateData.fullName = fullName;
    if (section)
        updateData.section = section;
    if (email)
        updateData.email = email;
    try {
        const updatedStudent = yield (0, studentOperations_1.updateStudentById)(req.params.id, updateData);
        if (!updatedStudent) {
            return res.status(404).json({ error: true, message: 'Student not found or update failed' });
        }
        res.status(200).json({
            error: false,
            message: 'Student updated successfully',
            updatedStudent
        });
    }
    catch (error) {
        res.status(500).json({ error: true, message: 'Error updating student' });
    }
}));
exports.default = router;
