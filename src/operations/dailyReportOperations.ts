import DailyReport, { IDailyReport } from '../models/DailyReport';

// Function to create multiple daily reports
export const createDailyReports = async (reportsData: Omit<IDailyReport, '_id'>[]): Promise<IDailyReport[]> => {
    try {
        // Process the reportsData
        const processedReports = reportsData.map(report => ({
            ...report,
            isPresent: report.isPresent ? '"Your Child has left the school"' : null,
            isAbsent: report.isAbsent ? '"Your Child is still at the school"' : null,
            hasEaten: report.hasEaten ? '"Your Child had their Snacks"' : null,
            hasNotEaten: report.hasNotEaten ? '"Your Child did not have their Snacks."' : null,
            hasUsedRestroom: report.hasUsedRestroom ? '"Your Child used the restroom"' : null,
            hasNotUsedRestroom: report.hasNotUsedRestroom ? '"Your Child did not use the restroom"' : null,
        }));

        // Insert the processed reports into the database
        const reports = await DailyReport.insertMany(processedReports);

        return reports as IDailyReport[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error creating daily reports: ' + error.message);
        } else {
            throw new Error('Error creating daily reports: ' + String(error));
        }
    }
};

// Function to retrieve all reports
export const getAllReports = async (): Promise<IDailyReport[]> => {
    try {
        const reports = await DailyReport.find();

        // Filter out null and undefined values from reports
        return reports.map(report => {
            const filteredReport: Record<string, any> = { ...report.toObject() };
            Object.keys(filteredReport).forEach(key => {
                if (filteredReport[key] == null) { // Check for both null and undefined
                    delete filteredReport[key];
                }
            });
            return filteredReport as IDailyReport;
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching daily reports: ' + error.message);
        } else {
            throw new Error('Error fetching daily reports: ' + String(error));
        }
    }
};

// Function to retrieve reports by studentName
export const getLatestReportByStudentName = async (studentName: string): Promise<IDailyReport | null> => {
    try {
        // Find the most recent report by sorting by dateTime in descending order
        const latestReport = await DailyReport.findOne({ studentName })
            .sort({ dateTime: -1 }) // Sort by dateTime in descending order to get the latest report
            .lean(); // Convert the Mongoose document to a plain object

        if (!latestReport) {
            return null; // Return null if no report is found
        }

        // Cast latestReport to a Record<string, any> to safely access and modify properties
        const reportObj = latestReport as Record<string, any>;

        // Filter out null and undefined values from the latest report
        Object.keys(reportObj).forEach(key => {
            if (reportObj[key] == null) { // Check for both null and undefined
                delete reportObj[key];
            }
        });

        return reportObj as IDailyReport;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error('Error fetching the latest daily report: ' + error.message);
        } else {
            throw new Error('Error fetching the latest daily report: ' + String(error));
        }
    }
};


