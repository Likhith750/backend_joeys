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
exports.getAttendanceByFullName = exports.postAttendance = void 0;
const Attendance_1 = __importDefault(require("../models/Attendance"));
// Function to post multiple attendance records
const postAttendance = (attendances) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedAttendances = yield Attendance_1.default.insertMany(attendances);
        return savedAttendances;
    }
    catch (error) {
        console.error('Error posting attendance:', error);
        return null;
    }
});
exports.postAttendance = postAttendance;
// Function to get attendance by full name
const getAttendanceByFullName = (fullname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendanceRecords = yield Attendance_1.default.find({ fullName: fullname });
        return attendanceRecords;
    }
    catch (error) {
        console.error('Error retrieving attendance records:', error);
        return null;
    }
});
exports.getAttendanceByFullName = getAttendanceByFullName;
