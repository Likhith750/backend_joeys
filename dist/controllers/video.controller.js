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
exports.getLatestVideo = exports.createVideo = void 0;
const video_model_1 = __importDefault(require("../models/video.model"));
const createVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoUrl } = req.body;
        const video = new video_model_1.default({ videoUrl });
        yield video.save();
        res.sendStatus(200);
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving video URL', error });
    }
});
exports.createVideo = createVideo;
const getLatestVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_model_1.default.findOne().sort({ _id: -1 });
        if (video) {
            res.json(video);
        }
        else {
            res.status(404).json({ message: 'No video URL found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching video URL', error });
    }
});
exports.getLatestVideo = getLatestVideo;
