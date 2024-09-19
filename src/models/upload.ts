import express from 'express';
import connectDB from '../db'; // Import your connection file
import uploadRoutes from '../routes/uploadRoutes'; // Import the routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
