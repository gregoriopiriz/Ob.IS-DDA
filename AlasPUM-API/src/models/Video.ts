import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IVideo extends Document {
    videoURL: String;
    planeId: String;
}

const VideoSchema: Schema = new Schema({
    videoURL: {
        type: String,
        unique: true,
        required: true
    },
    planeId: {
        type: String,
        unique: true,
        required: true
    },
},{
    versionKey: false,
    timestamps: true
});

export default model<IVideo>('Video', VideoSchema, 'Videos');