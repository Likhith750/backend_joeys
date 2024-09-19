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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const childDailyReportOperations_1 = require("../operations/childDailyReportOperations");
const router = (0, express_1.Router)();
// Route to create a new daily report
router.post('/reports', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className, reportDetails } = req.body;
        if (!className || !reportDetails) {
            res.status(400).json({ message: 'Class name and report details are required' });
            return;
        }
        yield (0, childDailyReportOperations_1.createReport)(className, reportDetails);
        res.status(201).json({ message: 'Report submitted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Route to get all daily reports (optional)
router.get('/reports', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield (0, childDailyReportOperations_1.getReports)();
        res.status(200).json(reports);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
// Route to get the latest report by className
router.get('/reports/:className', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className } = req.params;
        const report = yield (0, childDailyReportOperations_1.getLatestReportByClassName)(className);
        if (!report) {
            return res.status(404).json({ message: 'No reports found for this class' });
        }
        res.status(200).json(report);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
}));
exports.default = router;
