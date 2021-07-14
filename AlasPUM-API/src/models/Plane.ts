import { model, Schema, Document } from 'mongoose';

export interface IPlane extends Document {
    number: Number;
    entryDate: String;
    flightHours: Number;
    planeModel: String;
    videoURL: String;
    isActive: Boolean;
}

const PlaneSchema: Schema = new Schema({
    number: {
        type: Number,
        unique: true,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    flightHours: {
        type: Number,
        required: true
    },
    planeModel: {
        type: String,
        required: true
    },
    videoURL: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
    }
}, {
    versionKey: false,
    timestamps: true
});

PlaneSchema.pre<IPlane>('save', function (next) {

    this.isActive = true;

    next();
});

export default model<IPlane>('Plane', PlaneSchema, 'Planes');