import mongoose, { Document, Schema } from 'mongoose';

// Define the DailyReport schema
const DailyReportSchema: Schema = new Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  isPresent: { type: String, default: null }, // String to store message or null
  isAbsent: { type: String, default: null },  // String to store message or null
  hasEaten: { type: String, default: null },  // String to store message or null
  hasNotEaten: { type: String, default: null }, // String to store message or null
  hasUsedRestroom: { type: String, default: null }, // String to store message or null
  hasNotUsedRestroom: { type: String, default: null }, // String to store message or null
  todayActivity: { type: String, default: null },
  circleTimeActivity: { type: String, default: null },
  dateTime: { type: String, required: true } // ISO date-time string
});

// Define the interface for DailyReport document
export interface IDailyReport extends Document {
  studentId: string;
  studentName: string;
  isPresent?: string;
  isAbsent?: string;
  hasEaten?: string; 
  hasNotEaten?: string; 
  hasUsedRestroom?: string; 
  hasNotUsedRestroom?: string; 
  todayActivity?: string;
  circleTimeActivity?: string;
  dateTime: string; 
}

// Export the model
export default mongoose.model<IDailyReport>('DailyReport', DailyReportSchema);