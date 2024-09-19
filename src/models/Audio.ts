import mongoose, { Document, Schema } from 'mongoose';

interface IAudio extends Document {
    filename: string;
    contentType: string;
    audioData: string; // Store audio data as a Base64 string
}

const AudioSchema: Schema = new Schema({
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    audioData: { type: String, required: true }, // Base64 string
}, { timestamps: true }); // This adds createdAt and updatedAt fields

const Audio = mongoose.model<IAudio>('Audio', AudioSchema);

export default Audio;
