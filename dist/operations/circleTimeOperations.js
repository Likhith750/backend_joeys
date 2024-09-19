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
exports.getCircleTimeReportByClassName = exports.getCircleTimeReports = exports.createCircleTimeReport = void 0;
const CircleTimeReport_1 = __importDefault(require("../models/CircleTimeReport"));
// Create a new circle time report
const createCircleTimeReport = (className, circleTimeDetails) => __awaiter(void 0, void 0, void 0, function* () {
    if (!className || !circleTimeDetails) {
        throw new Error('Class name and circle time details are required');
    }
    const newCircleTimeReport = new CircleTimeReport_1.default({
        className,
        circleTimeDetails
    });
    yield newCircleTimeReport.save();
});
exports.createCircleTimeReport = createCircleTimeReport;
// Get all circle time reports
const getCircleTimeReports = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield CircleTimeReport_1.default.find().exec();
});
exports.getCircleTimeReports = getCircleTimeReports;
// Function to get a circle time report by className
const getCircleTimeReportByClassName = (className) => __awaiter(void 0, void 0, void 0, function* () {
    if (!className) {
        throw new Error('Class name is required');
    }
    try {
        const report = yield CircleTimeReport_1.default.findOne({ className }).exec();
        if (!report) {
            throw new Error('No report found for the provided class name');
        }
        return report;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error retrieving report: ' + error.message);
        }
        else {
            throw new Error('Unknown error occurred while retrieving the report');
        }
    }
});
exports.getCircleTimeReportByClassName = getCircleTimeReportByClassName;
