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
const uploadOperations_1 = require("../operations/uploadOperations"); // Ensure this path is correct
const router = express_1.default.Router();
// Multer setup
const storage = multer_1.default.memoryStorage(); // Store files in memory
const upload = (0, multer_1.default)({ storage: storage });
// Route to upload multiple images with category
router.post('/upload', upload.array('images'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body; // Get category from request body
        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).send('No files uploaded.');
        }
        if (!category || !['daily', 'event', 'activity'].includes(category)) {
            return res.status(400).send('Invalid or missing category.');
        }
        // Pass the category to the saveImages function
        const files = req.files; // Cast files to the correct type
        const savedImages = yield (0, uploadOperations_1.saveImages)(files, category);
        res.status(200).json(savedImages);
    }
    catch (error) {
        console.error('Error uploading images:', error); // Log the error
        res.status(500).send('Error uploading images: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
// Route to get all images, optionally filtered by category
router.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, uploadOperations_1.getAllImages)(req, res); // Call the getAllImages function to handle category filtering through query parameters
    }
    catch (error) {
        console.error('Error retrieving images:', error); // Log the error
        res.status(500).send('Error retrieving images: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
// Route to get a single image by name, optionally filtered by category
router.get('/images/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, uploadOperations_1.getImageByName)(req, res); // Call the getImageByName function to handle category filtering through query parameters
    }
    catch (error) {
        console.error('Error retrieving image:', error); // Log the error
        res.status(500).send('Error retrieving image: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
}));
exports.default = router;
