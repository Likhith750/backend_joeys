import { Schema, model, Document } from 'mongoose';

interface IChildDailyReport extends Document {
    className: string;
    reportDetails: string;
    createdAt: Date;
}

const ChildDailyReportSchema = new Schema<IChildDailyReport>({
    className: { type: String, required: true },
    reportDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const ChildDailyReport = model<IChildDailyReport>('ChildDailyReport', ChildDailyReportSchema);

export default ChildDailyReport;
