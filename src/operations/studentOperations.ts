import Student, { IStudent } from '../models/Student';
import mongoose from 'mongoose';

// Create a new student
export const createStudent = async (
    roll_id: string,
    fullName: string,
    section: 'primary' | 'pre-primary',
    email: string // Added email parameter
): Promise<IStudent | null> => {
    try {
        const student = new Student({
            roll_id,
            fullName,
            section,
            email, // Set email in the new student object
        });
        await student.save();
        return student;
    } catch (error) {
        console.error('Error creating student:', error);
        return null;
    }
};

// Get a student's section by their email
export const getStudentByEmail = async (email: string): Promise<{ error: boolean; section?: string }> => {
    try {
        const student = await Student.findOne({ email }).select('section');
        if (student) {
            return { error: false, section: student.section };
        } else {
            return { error: true };
        }
    } catch (error) {
        console.error('Error retrieving student by email:', error);
        return { error: true };
    }
};



// Get all students
export const getAllStudents = async (): Promise<IStudent[] | null> => {
    try {
        const students = await Student.find({});
        return students;
    } catch (error) {
        console.error('Error retrieving students:', error);
        return null;
    }
};

// Update a student's information by ID
export const updateStudentById = async (
    id: string,
    updateData: Partial<IStudent> // Allows partial update
): Promise<IStudent | null> => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });
        return updatedStudent;
    } catch (error) {
        console.error('Error updating student:', error);
        return null;
    }
};
