import express from 'express';
import multer from 'multer';
import { saveImages, getAllImages, getImageByName } from '../operations/uploadOperations'; // Ensure this path is correct

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Route to upload multiple images with category
router.post('/upload', upload.array('images'), async (req, res) => {
    try {
        const { category } = req.body; // Get category from request body

        if (!req.files || !Array.isArray(req.files)) {
            return res.status(400).send('No files uploaded.');
        }

        if (!category || !['daily', 'event', 'activity'].includes(category)) {
            return res.status(400).send('Invalid or missing category.');
        }

        // Pass the category to the saveImages function
        const files = req.files as Express.Multer.File[]; // Cast files to the correct type
        const savedImages = await saveImages(files, category);
        res.status(200).json(savedImages);
    } catch (error) {
        console.error('Error uploading images:', error); // Log the error
        res.status(500).send('Error uploading images: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

// Route to get all images, optionally filtered by category
router.get('/images', async (req, res) => {
    try {
        await getAllImages(req, res); // Call the getAllImages function to handle category filtering through query parameters
    } catch (error) {
        console.error('Error retrieving images:', error); // Log the error
        res.status(500).send('Error retrieving images: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

// Route to get a single image by name, optionally filtered by category
router.get('/images/:name', async (req, res) => {
    try {
        await getImageByName(req, res); // Call the getImageByName function to handle category filtering through query parameters
    } catch (error) {
        console.error('Error retrieving image:', error); // Log the error
        res.status(500).send('Error retrieving image: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
});

export default router;