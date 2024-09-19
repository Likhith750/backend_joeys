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
exports.updateStudentById = exports.getAllStudents = exports.getStudentByEmail = exports.createStudent = void 0;
const Student_1 = __importDefault(require("../models/Student"));
// Create a new student
const createStudent = (roll_id, fullName, section, email // Added email parameter
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = new Student_1.default({
            roll_id,
            fullName,
            section,
            email, // Set email in the new student object
        });
        yield student.save();
        return student;
    }
    catch (error) {
        console.error('Error creating student:', error);
        return null;
    }
});
exports.createStudent = createStudent;
// Get a student's section by their email
const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield Student_1.default.findOne({ email }).select('section');
        if (student) {
            return { error: false, section: student.section };
        }
        else {
            return { error: true };
        }
    }
    catch (error) {
        console.error('Error retrieving student by email:', error);
        return { error: true };
    }
});
exports.getStudentByEmail = getStudentByEmail;
// Get all students
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Student_1.default.find({});
        return students;
    }
    catch (error) {
        console.error('Error retrieving students:', error);
        return null;
    }
});
exports.getAllStudents = getAllStudents;
// Update a student's information by ID
const updateStudentById = (id, updateData // Allows partial update
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudent = yield Student_1.default.findByIdAndUpdate(id, updateData, { new: true });
        return updatedStudent;
    }
    catch (error) {
        console.error('Error updating student:', error);
        return null;
    }
});
exports.updateStudentById = updateStudentById;
