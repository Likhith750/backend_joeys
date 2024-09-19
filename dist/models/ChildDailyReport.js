"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChildDailyReportSchema = new mongoose_1.Schema({
    className: { type: String, required: true },
    reportDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const ChildDailyReport = (0, mongoose_1.model)('ChildDailyReport', ChildDailyReportSchema);
exports.default = ChildDailyReport;
