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
exports.getLatestReportByClassName = exports.getReportsByClassName = exports.getReports = exports.createReport = void 0;
const ChildDailyReport_1 = __importDefault(require("../models/ChildDailyReport"));
// Create a new daily report
const createReport = (className, reportDetails) => __awaiter(void 0, void 0, void 0, function* () {
    if (!className || !reportDetails) {
        throw new Error('Class name and report details are required');
    }
    const newReport = new ChildDailyReport_1.default({
        className,
        reportDetails
    });
    yield newReport.save();
});
exports.createReport = createReport;
// Get all daily reports
const getReports = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ChildDailyReport_1.default.find().exec();
});
exports.getReports = getReports;
// Get daily reports by className
const getReportsByClassName = (className) => __awaiter(void 0, void 0, void 0, function* () {
    if (!className) {
        throw new Error('Class name is required');
    }
    return yield ChildDailyReport_1.default.find({ className }).exec();
});
exports.getReportsByClassName = getReportsByClassName;
// Get the latest daily report by className
const getLatestReportByClassName = (className) => __awaiter(void 0, void 0, void 0, function* () {
    if (!className) {
        throw new Error('Class name is required');
    }
    return yield ChildDailyReport_1.default.findOne({ className })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec();
});
exports.getLatestReportByClassName = getLatestReportByClassName;
