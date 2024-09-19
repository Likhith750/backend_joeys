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
exports.getLatestReportByStudentName = exports.getAllReports = exports.createDailyReports = void 0;
const DailyReport_1 = __importDefault(require("../models/DailyReport"));
// Function to create multiple daily reports
const createDailyReports = (reportsData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Process the reportsData
        const processedReports = reportsData.map(report => (Object.assign(Object.assign({}, report), { isPresent: report.isPresent ? '"Your Child has left the school"' : null, isAbsent: report.isAbsent ? '"Your Child is still at the school"' : null, hasEaten: report.hasEaten ? '"Your Child had their Snacks"' : null, hasNotEaten: report.hasNotEaten ? '"Your Child did not have their Snacks."' : null, hasUsedRestroom: report.hasUsedRestroom ? '"Your Child used the restroom"' : null, hasNotUsedRestroom: report.hasNotUsedRestroom ? '"Your Child did not use the restroom"' : null })));
        // Insert the processed reports into the database
        const reports = yield DailyReport_1.default.insertMany(processedReports);
        return reports;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error creating daily reports: ' + error.message);
        }
        else {
            throw new Error('Error creating daily reports: ' + String(error));
        }
    }
});
exports.createDailyReports = createDailyReports;
// Function to retrieve all reports
const getAllReports = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield DailyReport_1.default.find();
        // Filter out null and undefined values from reports
        return reports.map(report => {
            const filteredReport = Object.assign({}, report.toObject());
            Object.keys(filteredReport).forEach(key => {
                if (filteredReport[key] == null) { // Check for both null and undefined
                    delete filteredReport[key];
                }
            });
            return filteredReport;
        });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching daily reports: ' + error.message);
        }
        else {
            throw new Error('Error fetching daily reports: ' + String(error));
        }
    }
});
exports.getAllReports = getAllReports;
// Function to retrieve reports by studentName
const getLatestReportByStudentName = (studentName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the most recent report by sorting by dateTime in descending order
        const latestReport = yield DailyReport_1.default.findOne({ studentName })
            .sort({ dateTime: -1 }) // Sort by dateTime in descending order to get the latest report
            .lean(); // Convert the Mongoose document to a plain object
        if (!latestReport) {
            return null; // Return null if no report is found
        }
        // Cast latestReport to a Record<string, any> to safely access and modify properties
        const reportObj = latestReport;
        // Filter out null and undefined values from the latest report
        Object.keys(reportObj).forEach(key => {
            if (reportObj[key] == null) { // Check for both null and undefined
                delete reportObj[key];
            }
        });
        return reportObj;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching the latest daily report: ' + error.message);
        }
        else {
            throw new Error('Error fetching the latest daily report: ' + String(error));
        }
    }
});
exports.getLatestReportByStudentName = getLatestReportByStudentName;
