// models/video.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IVideo extends Document {
    videoUrl: string;
}

const VideoSchema: Schema = new Schema({
    videoUrl: { type: String, required: true },
});

const Video = mongoose.model<IVideo>('Video', VideoSchema);

export default Video;