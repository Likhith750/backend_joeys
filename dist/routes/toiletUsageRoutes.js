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
const toiletUsageOperations_1 = require("../operations/toiletUsageOperations");
const router = (0, express_1.Router)();
// Route to create toilet usages
router.post('/toilet_usage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, toiletUsageOperations_1.createToiletUsage)(req.body.toiletUsages);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get all toilet usages
router.get('/toilet_usages', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, toiletUsageOperations_1.getAllToiletUsages)();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get toilet usages by fullName
router.get('/toilet_usage/:fullName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, toiletUsageOperations_1.getToiletUsageByFullName)(req.params.fullName); // Updated to fetch by fullName
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No toilet usage records found for the given full name' });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
