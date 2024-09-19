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
// routes/workUpdatesRoutes.ts
const express_1 = require("express");
const workUpdatesOperations_1 = require("../operations/workUpdatesOperations");
const router = (0, express_1.Router)();
// POST: Create a new work update
router.post('/work-updates/submit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { className, details } = req.body;
    try {
        const workUpdate = yield (0, workUpdatesOperations_1.createWorkUpdate)(className, details);
        res.status(201).json({ message: 'Work update submitted successfully', workUpdate });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to submit work update', error });
    }
}));
// GET: Retrieve work updates from the last 24 hours
router.get('/work-updates', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workUpdates = yield (0, workUpdatesOperations_1.getRecentWorkUpdates)();
        res.status(200).json(workUpdates);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve work updates', error });
    }
}));
exports.default = router;
