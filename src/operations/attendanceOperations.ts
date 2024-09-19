import Attendance, { IAttendance } from '../models/Attendance';

// Function to post multiple attendance records
export const postAttendance = async (
    attendances: IAttendance[]
): Promise<IAttendance[] | null> => {
    try {
        const savedAttendances = await Attendance.insertMany(attendances);
        return savedAttendances;
    } catch (error) {
        console.error('Error posting attendance:', error);
        return null;
    }
};

// Function to get attendance by full name
export const getAttendanceByFullName = async (fullname: string): Promise<IAttendance[] | null> => {
    try {
        const attendanceRecords = await Attendance.find({ fullName: fullname });
        return attendanceRecords;
    } catch (error) {
        console.error('Error retrieving attendance records:', error);
        return null;
    }
};
