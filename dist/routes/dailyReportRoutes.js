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
const dailyReportOperations_1 = require("../operations/dailyReportOperations");
const router = express_1.default.Router();
// Route to submit multiple daily reports
router.post('/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportsData = req.body;
        const reports = yield (0, dailyReportOperations_1.createDailyReports)(reportsData);
        res.status(201).json(reports);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Unknown error' });
    }
}));
// Route to fetch all daily reports
router.get('/reports', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield (0, dailyReportOperations_1.getAllReports)();
        res.status(200).json(reports);
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Unknown error' });
    }
}));
// Route to fetch daily reports by student name
// Route to fetch the latest daily report by student name
router.get('/reports/by-student/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentName = req.params.name;
    try {
        const latestReport = yield (0, dailyReportOperations_1.getLatestReportByStudentName)(studentName);
        if (latestReport) {
            res.status(200).json(latestReport);
        }
        else {
            res.status(404).json({ message: 'No report found for the specified student.' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message || 'Unknown error' });
    }
}));
exports.default = router;
