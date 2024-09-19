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
const crewMemberOperations_1 = require("../operations/crewMemberOperations");
const router = express_1.default.Router();
// Route to store crew members
router.post('/crew-members', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crewMembers = req.body;
        const result = yield (0, crewMemberOperations_1.createCrewMembers)(crewMembers);
        res.status(201).json(result);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
}));
// Route to get crew members by fullName
router.get('/crew-members', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullName = req.query.fullName;
        if (!fullName) {
            return res.status(400).json({ success: false, message: 'fullName query parameter is required' });
        }
        const crewMembers = yield (0, crewMemberOperations_1.getCrewMembersByFullName)(fullName);
        res.status(200).json(crewMembers);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
}));
// New route to get additional crew members based on name and relation
router.get('/crew-members/additional', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullName = req.query.fullName;
        if (!fullName) {
            return res.status(400).json({ success: false, message: 'fullName query parameter is required' });
        }
        const additionalMembers = yield (0, crewMemberOperations_1.getAdditionalCrewMembers)(fullName);
        res.status(200).json(additionalMembers);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        }
        else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
}));
exports.default = router;
