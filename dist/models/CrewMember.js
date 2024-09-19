"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CrewMemberSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    className: { type: String, required: true },
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    relation: { type: String, required: true },
}, { timestamps: true });
const CrewMember = (0, mongoose_1.model)('CrewMember', CrewMemberSchema);
exports.default = CrewMember;
