import { model, Schema, Document } from 'mongoose';

export interface INationalFlight extends Document {
    type: String
    number: Number,
    origin: String,
    destination: String,
    departureDate: Date,
    arrivalDate: Date,
    totalMiles: Number,
    planeNumber: Number,
    isActive: Boolean
}

const NationalFlightSchema: Schema = new Schema({
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
    isActive: {
        type: Boolean
    }
}, {
    versionKey: false,
    timestamps: true
});

NationalFlightSchema.pre<INationalFlight>('save', function (next) {

    this.isActive = true;
    this.type = 'National';

    next();
});


export default model<INationalFlight>('NationalFlight', NationalFlightSchema, 'Flights');