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
exports.getCheckedOutByFullName = exports.postCheckedOut = void 0;
const CheckedOut_1 = __importDefault(require("../models/CheckedOut"));
// Function to post multiple checked-out records
const postCheckedOut = (checkedOuts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedCheckedOuts = yield CheckedOut_1.default.insertMany(checkedOuts);
        return savedCheckedOuts;
    }
    catch (error) {
        console.error('Error posting checked-out records:', error);
        return null;
    }
});
exports.postCheckedOut = postCheckedOut;
// Function to get checked-out records by full name
const getCheckedOutByFullName = (fullName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkedOutRecords = yield CheckedOut_1.default.find({ fullName });
        return checkedOutRecords;
    }
    catch (error) {
        console.error('Error retrieving checked-out records:', error);
        return null;
    }
});
exports.getCheckedOutByFullName = getCheckedOutByFullName;
