import { Schema, model, Document } from 'mongoose';

interface ICircleTimeReport extends Document {
    className: string;
    circleTimeDetails: string;
    createdAt: Date;
}

const CircleTimeReportSchema = new Schema<ICircleTimeReport>({
    className: { type: String, required: true },
    circleTimeDetails: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CircleTimeReport = model<ICircleTimeReport>('CircleTimeReport', CircleTimeReportSchema);

export default CircleTimeReport;
