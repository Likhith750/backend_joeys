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
exports.getChildObservationsByRollId = exports.getChildObservationsByFullName = exports.getChildObservationById = exports.getAllChildObservations = exports.createChildObservations = void 0;
const childObservation_1 = __importDefault(require("../models/childObservation"));
// Create multiple ChildObservation entries
const createChildObservations = (observations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield childObservation_1.default.insertMany(observations);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating child observations: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while creating child observations');
        }
    }
});
exports.createChildObservations = createChildObservations;
// Retrieve all ChildObservation entries
const getAllChildObservations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield childObservation_1.default.find();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observations: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while retrieving child observations');
        }
    }
});
exports.getAllChildObservations = getAllChildObservations;
// Retrieve a ChildObservation entry by ID
const getChildObservationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield childObservation_1.default.findById(id);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observation by ID: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while retrieving child observation by ID');
        }
    }
});
exports.getChildObservationById = getChildObservationById;
// Retrieve ChildObservation entries by fullName
const getChildObservationsByFullName = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield childObservation_1.default.find({ fullName }).exec();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observations for fullName ${fullName}: ${error.message}`);
        }
        else {
            throw new Error(`An unknown error occurred while retrieving child observations for fullName ${fullName}`);
        }
    }
});
exports.getChildObservationsByFullName = getChildObservationsByFullName;
// Get observations by rollId
const getChildObservationsByRollId = (rollId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield childObservation_1.default.find({ rollId }).exec();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observations for rollId ${rollId}: ${error.message}`);
        }
        else {
            throw new Error(`An unknown error occurred while retrieving child observations for rollId ${rollId}`);
        }
    }
});
exports.getChildObservationsByRollId = getChildObservationsByRollId;
