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
const circleTimeOperations_1 = require("../operations/circleTimeOperations");
const router = (0, express_1.Router)();
// Route to create a new circle time report
router.post('/circle-time-reports', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className, circleTimeDetails } = req.body;
        if (!className || !circleTimeDetails) {
            res.status(400).json({ message: 'Class name and circle time details are required' });
            return;
        }
        yield (0, circleTimeOperations_1.createCircleTimeReport)(className, circleTimeDetails);
        res.status(201).json({ message: 'Circle time report submitted successfully' });
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
// Route to get all circle time reports
router.get('/circle-time-reports', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = yield (0, circleTimeOperations_1.getCircleTimeReports)();
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
// Route to get a circle time report by className
router.get('/circle-time-reports/:className', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className } = req.params;
        if (!className) {
            res.status(400).json({ message: 'Class name is required' });
            return;
        }
        const report = yield (0, circleTimeOperations_1.getCircleTimeReportByClassName)(className);
        if (report) {
            res.status(200).json(report);
        }
        else {
            res.status(404).json({ message: 'Report not found' });
        }
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
