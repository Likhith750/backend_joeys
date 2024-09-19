import ToiletUsage, { IToiletUsage } from '../models/ToiletUsage';

// Create multiple ToiletUsage entries
export const createToiletUsage = async (toiletUsages: Omit<IToiletUsage, '_id'>[]): Promise<IToiletUsage[]> => {
    try {
        return await ToiletUsage.insertMany(toiletUsages);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating toilet usage: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while creating toilet usage');
        }
    }
};

// Retrieve all ToiletUsage entries
export const getAllToiletUsages = async (): Promise<IToiletUsage[]> => {
    try {
        return await ToiletUsage.find();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving toilet usages: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while retrieving toilet usages');
        }
    }
};

// Retrieve ToiletUsage entries by fullName
export const getToiletUsageByFullName = async (fullName: string): Promise<IToiletUsage[]> => {
    try {
        return await ToiletUsage.find({ fullName });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving toilet usage by fullName: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while retrieving toilet usage by fullName');
        }
    }
};

// Retrieve a ToiletUsage entry by ID
export const getToiletUsageById = async (id: string): Promise<IToiletUsage | null> => {
    try {
        return await ToiletUsage.findById(id);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving toilet usage by ID: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while retrieving toilet usage by ID');
        }
    }
};

// Other functions like updateToiletUsageById, deleteToiletUsageById...
