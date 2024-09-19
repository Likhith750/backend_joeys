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
exports.getToiletUsageById = exports.getToiletUsageByFullName = exports.getAllToiletUsages = exports.createToiletUsage = void 0;
const ToiletUsage_1 = __importDefault(require("../models/ToiletUsage"));
// Create multiple ToiletUsage entries
const createToiletUsage = (toiletUsages) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ToiletUsage_1.default.insertMany(toiletUsages);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating toilet usage: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while creating toilet usage');
        }
    }
});
exports.createToiletUsage = createToiletUsage;
// Retrieve all ToiletUsage entries
const getAllToiletUsages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ToiletUsage_1.default.find();
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving toilet usages: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while retrieving toilet usages');
        }
    }
});
exports.getAllToiletUsages = getAllToiletUsages;
// Retrieve ToiletUsage entries by fullName
const getToiletUsageByFullName = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ToiletUsage_1.default.find({ fullName });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving toilet usage by fullName: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while retrieving toilet usage by fullName');
        }
    }
});
exports.getToiletUsageByFullName = getToiletUsageByFullName;
// Retrieve a ToiletUsage entry by ID
const getToiletUsageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield ToiletUsage_1.default.findById(id);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving toilet usage by ID: ${error.message}`);
        }
        else {
            throw new Error('An unknown error occurred while retrieving toilet usage by ID');
        }
    }
});
exports.getToiletUsageById = getToiletUsageById;
// Other functions like updateToiletUsageById, deleteToiletUsageById...
