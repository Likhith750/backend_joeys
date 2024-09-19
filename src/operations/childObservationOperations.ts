import ChildObservationModel, { IChildObservation } from '../models/childObservation';

// Create multiple ChildObservation entries
export const createChildObservations = async (observations: Omit<IChildObservation, '_id'>[]): Promise<IChildObservation[]> => {
    try {
        return await ChildObservationModel.insertMany(observations);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating child observations: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while creating child observations');
        }
    }
};

// Retrieve all ChildObservation entries
export const getAllChildObservations = async (): Promise<IChildObservation[]> => {
    try {
        return await ChildObservationModel.find();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observations: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while retrieving child observations');
        }
    }
};

// Retrieve a ChildObservation entry by ID
export const getChildObservationById = async (id: string): Promise<IChildObservation | null> => {
    try {
        return await ChildObservationModel.findById(id);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observation by ID: ${error.message}`);
        } else {
            throw new Error('An unknown error occurred while retrieving child observation by ID');
        }
    }
};

// Retrieve ChildObservation entries by fullName
export const getChildObservationsByFullName = async (fullName: string): Promise<IChildObservation[]> => {
    try {
        return await ChildObservationModel.find({ fullName }).exec();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observations for fullName ${fullName}: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred while retrieving child observations for fullName ${fullName}`);
        }
    }
};


// Get observations by rollId
export const getChildObservationsByRollId = async (rollId: string): Promise<IChildObservation[]> => {
    try {
        return await ChildObservationModel.find({ rollId }).exec();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving child observations for rollId ${rollId}: ${error.message}`);
        } else {
            throw new Error(`An unknown error occurred while retrieving child observations for rollId ${rollId}`);
        }
    }
};
