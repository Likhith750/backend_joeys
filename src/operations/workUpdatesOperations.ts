// operations/workUpdatesOperations.ts
import WorkUpdates, { IWorkUpdates } from '../models/WorkUpdates';

export const createWorkUpdate = async (className: string, details: string): Promise<IWorkUpdates> => {
    const newWorkUpdate = new WorkUpdates({ className, details });
    return await newWorkUpdate.save();
};

export const getRecentWorkUpdates = async (): Promise<IWorkUpdates[]> => {
    // Calculate the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

    // Query the database for updates created in the last 24 hours
    return await WorkUpdates.find({ createdAt: { $gte: twentyFourHoursAgo } })
                           .sort({ createdAt: -1 });
};
