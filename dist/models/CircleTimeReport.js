"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CircleTimeReportSchema = new mongoose_1.Schema({
    className: { type: String, required: true },
    circleTimeDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const CircleTimeReport = (0, mongoose_1.model)('CircleTimeReport', CircleTimeReportSchema);
exports.default = CircleTimeReport;
