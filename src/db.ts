import mongoose from 'mongoose';
import config from './config/config';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('MongoDB connected...');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error connecting to MongoDB:', error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
        process.exit(1);
    }
};

export default connectDB;
