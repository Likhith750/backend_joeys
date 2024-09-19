"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getImageByName = exports.getAllImages = exports.saveImages = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
const sharp_1 = __importDefault(require("sharp"));
const multer_1 = __importDefault(require("multer"));
// Update the schema to include the 'category' field
const ImageSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Store image as Base64 string
    contentType: { type: String, required: true },
    category: { type: String, enum: ['daily', 'event', 'activity'], required: true }, // Add category field with options
});
// Create the Image model
const Image = mongoose_1.default.model('Image', ImageSchema);
// Multer setup
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Function to save images with categories
const saveImages = (files, category) => __awaiter(void 0, void 0, void 0, function* () {
    if (!files || files.length === 0) {
        throw new Error('No file data found');
    }
    try {
        const images = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            // Compress the image using sharp
            const compressedImageBuffer = yield (0, sharp_1.default)(file.buffer)
                .resize({ width: 800 }) // Adjust the width as needed
                .jpeg({ quality: 80 }) // Adjust the quality as needed
                .toBuffer();
            // Create and save image document
            const img = new Image({
                name: file.originalname,
                image: compressedImageBuffer.toString('base64'),
                contentType: file.mimetype,
                category, // Store the category in the image document
            });
            return img.save();
        })));
        return images;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error('Error processing images: ' + error.message);
        }
        else {
            throw new Error('Unknown error occurred while processing images');
        }
    }
});
exports.saveImages = saveImages;
// Function to retrieve all images from the database, with optional filtering by category
const getAllImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query; // Optional category filter
    let filter = {};
    if (category && ['daily', 'event', 'activity'].includes(category)) {
        filter.category = category; // Filter by category if specified
    }
    try {
        // Retrieve the images including the Base64 data, optionally filtered by category
        const images = yield Image.find(filter, '_id name image category').lean().exec();
        // Format the data
        const formattedImages = images.map(image => ({
            _id: image._id.toString(), // Cast _id to string
            name: image.name,
            category: image.category, // Include category in response
            imageData: image.image, // This is the Base64 string
        }));
        res.status(200).json(formattedImages);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error retrieving images: ' + error.message);
        }
        else {
            res.status(500).send('Unknown error occurred while retrieving images');
        }
    }
});
exports.getAllImages = getAllImages;
// Function to retrieve an image by its name and optionally by category
const getImageByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params; // Assuming the image name is passed as a URL parameter
    const { category } = req.query; // Optional category filter
    let filter = { name };
    if (category && ['daily', 'event', 'activity'].includes(category)) {
        filter.category = category; // Filter by category if specified
    }
    try {
        // Find the image by name and optionally by category
        const image = yield Image.findOne(filter).lean().exec();
        if (!image) {
            res.status(404).send('Image not found');
            return;
        }
        // Convert the Base64 string back to binary data
        const imageBuffer = Buffer.from(image.image, 'base64');
        // Set the appropriate Content-Type header
        res.setHeader('Content-Type', image.contentType);
        // Send the binary image data
        res.send(imageBuffer);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error retrieving image: ' + error.message);
        }
        else {
            res.status(500).send('Unknown error occurred while retrieving image');
        }
    }
});
exports.getImageByName = getImageByName;
// Express setup
const app = (0, express_1.default)();
const port = 5000;
// Route to handle multiple image uploads
app.post('/upload', upload.array('images'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.body; // Category should be passed in the request body
    if (!category || !['daily', 'event', 'activity'].includes(category)) {
        return res.status(400).send('Invalid or missing category');
    }
    try {
        const files = req.files;
        const savedImages = yield (0, exports.saveImages)(files, category);
        res.status(200).json(savedImages);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send('Error uploading images: ' + error.message);
        }
        else {
            res.status(500).send('Unknown error occurred while uploading images');
        }
    }
}));
// Route to handle retrieving all images
app.get('/images', exports.getAllImages);
// Route to handle retrieving an image by name
app.get('/images/:name', exports.getImageByName);
