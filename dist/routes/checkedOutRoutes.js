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
const checkedOutOperations_1 = require("../operations/checkedOutOperations");
const router = express_1.default.Router();
// Post checked-out records
router.post('/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const checkedOuts = req.body; // Expecting an array of checked-out objects
    if (!Array.isArray(checkedOuts) || checkedOuts.length === 0) {
        return res.status(400).json({ error: true, message: 'Checked-out data must be an array and cannot be empty' });
    }
    const savedCheckedOuts = yield (0, checkedOutOperations_1.postCheckedOut)(checkedOuts);
    if (!savedCheckedOuts) {
        return res.status(400).json({ error: true, message: 'Error posting checked-out records' });
    }
    res.status(201).json({ error: false, message: 'Checked-out records posted successfully', savedCheckedOuts });
}));
// Get checked-out records by full name
router.get('/:fullname', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname } = req.params;
    try {
        console.log(`Searching for fullName: ${fullname}`);
        const checkedOutRecords = yield (0, checkedOutOperations_1.getCheckedOutByFullName)(fullname);
        if (!checkedOutRecords || checkedOutRecords.length === 0) {
            return res.status(404).json({ error: true, message: 'No checked-out records found' });
        }
        res.status(200).json({ error: false, checkedOutRecords });
    }
    catch (error) {
        console.error('Error retrieving checked-out records:', error);
        res.status(500).json({ error: true, message: 'An error occurred while retrieving the records' });
    }
}));
exports.default = router;
