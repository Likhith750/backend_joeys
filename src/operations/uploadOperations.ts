import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import sharp from 'sharp';
import multer from 'multer';

// Define the interface for the Image document with categories
interface IImage extends Document {
    name: string;
    image: string; // Store as Base64 string
    contentType: string;
    category: 'daily' | 'event' | 'activity'; // Define category type
}

// Update the schema to include the 'category' field
const ImageSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, // Store image as Base64 string
    contentType: { type: String, required: true },
    category: { type: String, enum: ['daily', 'event', 'activity'], required: true }, // Add category field with options
});

// Create the Image model
const Image = mongoose.model<IImage>('Image', ImageSchema);

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

// Function to save images with categories
export const saveImages = async (files: Express.Multer.File[], category: 'daily' | 'event' | 'activity'): Promise<IImage[]> => {
    if (!files || files.length === 0) {
        throw new Error('No file data found');
    }

    try {
        const images = await Promise.all(files.map(async (file) => {
            // Compress the image using sharp
            const compressedImageBuffer = await sharp(file.buffer)
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
        }));

        return images;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error processing images: ' + error.message);
        } else {
            throw new Error('Unknown error occurred while processing images');
        }
    }
};

// Function to retrieve all images from the database, with optional filtering by category
export const getAllImages = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query; // Optional category filter

    let filter: any = {};
    if (category && ['daily', 'event', 'activity'].includes(category as string)) {
        filter.category = category; // Filter by category if specified
    }

    try {
        // Retrieve the images including the Base64 data, optionally filtered by category
        const images = await Image.find(filter, '_id name image category').lean().exec();

        // Format the data
        const formattedImages = images.map(image => ({
            _id: image._id.toString(), // Cast _id to string
            name: image.name,
            category: image.category, // Include category in response
            imageData: image.image, // This is the Base64 string
        }));

        res.status(200).json(formattedImages);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send('Error retrieving images: ' + error.message);
        } else {
            res.status(500).send('Unknown error occurred while retrieving images');
        }
    }
};

// Function to retrieve an image by its name and optionally by category
export const getImageByName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params; // Assuming the image name is passed as a URL parameter
    const { category } = req.query; // Optional category filter

    let filter: any = { name };
    if (category && ['daily', 'event', 'activity'].includes(category as string)) {
        filter.category = category; // Filter by category if specified
    }

    try {
        // Find the image by name and optionally by category
        const image = await Image.findOne(filter).lean().exec();

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
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send('Error retrieving image: ' + error.message);
        } else {
            res.status(500).send('Unknown error occurred while retrieving image');
        }
    }
};

// Express setup
const app = express();
const port = 5000;

// Route to handle multiple image uploads
app.post('/upload', upload.array('images'), async (req: Request, res: Response) => {
    const { category } = req.body; // Category should be passed in the request body

    if (!category || !['daily', 'event', 'activity'].includes(category)) {
        return res.status(400).send('Invalid or missing category');
    }

    try {
        const files = req.files as Express.Multer.File[];
        const savedImages = await saveImages(files, category);
        res.status(200).json(savedImages);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send('Error uploading images: ' + error.message);
        } else {
            res.status(500).send('Unknown error occurred while uploading images');
        }
    }
});

// Route to handle retrieving all images
app.get('/images', getAllImages);

// Route to handle retrieving an image by name
app.get('/images/:name', getImageByName);