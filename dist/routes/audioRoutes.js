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
const multer_1 = __importDefault(require("multer"));
const Audio_1 = __importDefault(require("../models/Audio"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// POST route to upload the audio file
router.post('/upload_audio', upload.single('audioFile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { originalname, mimetype, buffer } = req.file;
        const base64Data = buffer.toString('base64');
        const audio = new Audio_1.default({
            filename: originalname,
            contentType: mimetype,
            audioData: base64Data,
        });
        yield audio.save();
        console.log("Audio uploaded:", audio);
        res.status(201).json({ message: 'Audio uploaded successfully', audioId: audio._id });
    }
    catch (error) {
        console.error('Error uploading audio:', error);
        res.status(500).json({ error: 'Failed to upload audio' });
    }
}));
// GET route to retrieve the latest audio file
router.get('/audio/latest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching the latest audio file...");
        const audio = yield Audio_1.default.findOne().sort({ createdAt: -1 }); // Sorting by the `createdAt` timestamp
        if (!audio) {
            console.error("No audio file found.");
            return res.status(404).json({ error: 'Audio file not found' });
        }
        console.log("Latest audio found:", audio);
        const audioBuffer = Buffer.from(audio.audioData, 'base64');
        // Save buffer to file for debugging (optional)
        fs_1.default.writeFileSync('debug_audio_file.wav', audioBuffer);
        res.setHeader('Content-Type', audio.contentType);
        res.send(audioBuffer);
    }
    catch (error) {
        console.error('Error retrieving audio:', error);
        res.status(500).json({ error: 'Failed to retrieve audio' });
    }
}));
exports.default = router;
