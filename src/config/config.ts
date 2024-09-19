import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/joeys_db',
    JWT_SECRET: process.env.JWT_SECRET || '',
    PORT: process.env.PORT || 5000,
};
