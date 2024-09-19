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
const attendanceOperations_1 = require("../operations/attendanceOperations");
const router = express_1.default.Router();
// Post attendance
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const attendances = req.body; // Expecting an array of attendance objects
    if (!Array.isArray(attendances) || attendances.length === 0) {
        return res.status(400).json({ error: true, message: 'Attendance data must be an array and cannot be empty' });
    }
    const savedAttendances = yield (0, attendanceOperations_1.postAttendance)(attendances);
    if (!savedAttendances) {
        return res.status(400).json({ error: true, message: 'Error posting attendance' });
    }
    res.status(201).json({ error: false, message: 'Attendance posted successfully', savedAttendances });
}));
// Get attendance by full name
router.get('/:fullname', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname } = req.params;
    try {
        console.log(`Searching for fullName: ${fullname}`);
        const attendanceRecords = yield (0, attendanceOperations_1.getAttendanceByFullName)(fullname);
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(404).json({ error: true, message: 'No attendance records found' });
        }
        res.status(200).json({ error: false, attendanceRecords });
    }
    catch (error) {
        console.error('Error retrieving attendance records:', error);
        res.status(500).json({ error: true, message: 'An error occurred while retrieving the records' });
    }
}));
exports.default = router;
