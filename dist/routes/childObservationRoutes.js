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
const childObservationOperations_1 = require("../operations/childObservationOperations");
const router = (0, express_1.Router)();
// Route to create multiple child observations
router.post('/child_observations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { observations } = req.body;
        if (!Array.isArray(observations)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }
        // Validate if required fields are present
        if (!observations.every(obs => obs.rollId && obs.description && obs.fullName)) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const result = yield (0, childObservationOperations_1.createChildObservations)(observations);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get all child observations
router.get('/child_observations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, childObservationOperations_1.getAllChildObservations)();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get a child observation by ID
router.get('/child_observation/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, childObservationOperations_1.getChildObservationById)(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'ChildObservation not found' });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get observations by rollId
router.get('/child_observations/rollId/:rollId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, childObservationOperations_1.getChildObservationsByRollId)(req.params.rollId);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No observations found for this rollId' });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Route to get observations by fullName
router.get('/child_observations/:fullName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, childObservationOperations_1.getChildObservationsByFullName)(req.params.fullName);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No observations found for this fullName' });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
