import ChildDailyReport from '../models/ChildDailyReport';

// Create a new daily report
export const createReport = async (className: string, reportDetails: string): Promise<void> => {
    if (!className || !reportDetails) {
        throw new Error('Class name and report details are required');
    }

    const newReport = new ChildDailyReport({
        className,
        reportDetails
    });

    await newReport.save();
};

// Get all daily reports
export const getReports = async (): Promise<Array<any>> => {
    return await ChildDailyReport.find().exec();
};

// Get daily reports by className
export const getReportsByClassName = async (className: string): Promise<Array<any>> => {
    if (!className) {
        throw new Error('Class name is required');
    }

    return await ChildDailyReport.find({ className }).exec();
};

// Get the latest daily report by className
export const getLatestReportByClassName = async (className: string): Promise<any | null> => {
    if (!className) {
        throw new Error('Class name is required');
    }

    return await ChildDailyReport.findOne({ className })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order
        .exec();
};
