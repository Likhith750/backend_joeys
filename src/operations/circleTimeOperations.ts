import CircleTimeReport from '../models/CircleTimeReport';

// Create a new circle time report
export const createCircleTimeReport = async (className: string, circleTimeDetails: string): Promise<void> => {
    if (!className || !circleTimeDetails) {
        throw new Error('Class name and circle time details are required');
    }

    const newCircleTimeReport = new CircleTimeReport({
        className,
        circleTimeDetails
    });

    await newCircleTimeReport.save();
};

// Get all circle time reports
export const getCircleTimeReports = async (): Promise<Array<any>> => {
    return await CircleTimeReport.find().exec();
};

// Function to get a circle time report by className
export const getCircleTimeReportByClassName = async (className: string) => {
    if (!className) {
        throw new Error('Class name is required');
    }

    try {
        const report = await CircleTimeReport.findOne({ className }).exec();
        if (!report) {
            throw new Error('No report found for the provided class name');
        }
        return report;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error retrieving report: ' + error.message);
        } else {
            throw new Error('Unknown error occurred while retrieving the report');
        }
    }
};
