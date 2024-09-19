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
exports.getRecentWorkUpdates = exports.createWorkUpdate = void 0;
// operations/workUpdatesOperations.ts
const WorkUpdates_1 = __importDefault(require("../models/WorkUpdates"));
const createWorkUpdate = (className, details) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkUpdate = new WorkUpdates_1.default({ className, details });
    return yield newWorkUpdate.save();
});
exports.createWorkUpdate = createWorkUpdate;
const getRecentWorkUpdates = () => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);
    // Query the database for updates created in the last 24 hours
    return yield WorkUpdates_1.default.find({ createdAt: { $gte: twentyFourHoursAgo } })
        .sort({ createdAt: -1 });
});
exports.getRecentWorkUpdates = getRecentWorkUpdates;
