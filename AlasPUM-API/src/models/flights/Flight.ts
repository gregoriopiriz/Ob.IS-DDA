import { model, Schema, Document } from 'mongoose';

export interface IFlight extends Document {
    number: Number,
    type: String,
    origin: String,
    destination: String,
    departureDate: Date,
    arrivalDate: Date,
    totalMiles: Number,
    planeNumber: Number,
    documentation: String,
    isActive: Boolean
}

const FlightSchema: Schema = new Schema({
    number: {
        type: Number,
        required: true
    },
    type: {
        type: String,
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    totalMiles: {
        type: Number,
        required: true
    },
    planeNumber: {
        type: Number,
        required: true
    },
    documentation: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean
    }
}, {
    versionKey: false,
    timestamps: true
});

FlightSchema.pre<IFlight>('save', function (next) {

    this.isActive = true;

    next();
});


export default model<IFlight>('Flight', FlightSchema, 'Flights');