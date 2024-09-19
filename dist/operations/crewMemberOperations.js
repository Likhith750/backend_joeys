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
exports.getAdditionalCrewMembers = exports.getCrewMembersByFullName = exports.createCrewMembers = void 0;
const CrewMember_1 = __importDefault(require("../models/CrewMember"));
// Existing function to create crew members
const createCrewMembers = (crewMembers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CrewMember_1.default.insertMany(crewMembers);
        return { success: true, message: 'Crew members stored successfully' };
    }
    catch (error) {
        throw new Error('Failed to store crew members');
    }
});
exports.createCrewMembers = createCrewMembers;
// Existing function to get crew members by fullName
const getCrewMembersByFullName = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crewMembers = yield CrewMember_1.default.find({ fullName }, 'name email relation');
        return crewMembers;
    }
    catch (error) {
        throw new Error('Failed to retrieve crew members');
    }
});
exports.getCrewMembersByFullName = getCrewMembersByFullName;
// New function to get additional crew members based on name and relation
const getAdditionalCrewMembers = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find crew member with the specified fullName
        const crewMember = yield CrewMember_1.default.findOne({ fullName });
        if (!crewMember) {
            throw new Error('Crew member not found');
        }
        // Retrieve additional crew members with matching name and relation but different fullName
        const additionalMembers = yield CrewMember_1.default.find({
            name: crewMember.name,
            relation: crewMember.relation,
            fullName: { $ne: fullName } // Exclude the original member
        });
        return additionalMembers;
    }
    catch (error) {
        throw new Error('Failed to retrieve additional crew members');
    }
});
exports.getAdditionalCrewMembers = getAdditionalCrewMembers;
