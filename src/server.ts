import express from 'express';
import bodyParser from 'body-parser'; 
import connectDB from './db';
import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import checkedOutRoutes from './routes/checkedOutRoutes';
import childDailyReportRoutes from './routes/childDailyReportRoutes'; 
import circleTimeReportRoutes from './routes/circleTimeRoutes'; 
import toiletUsageRoutes from './routes/toiletUsageRoutes'; 
import childObservationRoutes from './routes/childObservationRoutes';
import audioRoutes from './routes/audioRoutes';
import videoRoutes from './routes/video.routes';
import workUpdatesRoutes from './routes/workUpdatesRoutes';
import crewMemberRoutes from './routes/crewMemberRoutes';
import config from './config/config';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes';
import profileRoutes from './routes/profileRoutes';
import notificationRoutes from './routes/NotificationRoutes';
import feedbackRoutes from './routes/feedback.routes';
import dailyReportRoutes from './routes/dailyReportRoutes';
import otpRoutes from './routes/otp.routes';


const app = express();

connectDB();

app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/checked-out', checkedOutRoutes);
app.use('/api/child-daily-reports', childDailyReportRoutes); 
app.use('/api/circle-time-reports', circleTimeReportRoutes); 
app.use('/api/toilet-usages', toiletUsageRoutes);
app.use('/api/child-observations', childObservationRoutes);
app.use('/api/upload-audio', audioRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/work-updates', workUpdatesRoutes);
app.use('/api/crewMembers', crewMemberRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/dailyReports', dailyReportRoutes);
app.use('/api/otp', otpRoutes);

// Centralized error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred.' });
});

const PORT = config.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
