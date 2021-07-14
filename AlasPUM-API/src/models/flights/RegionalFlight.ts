import { model, Schema, Document } from 'mongoose';

export interface IRegionalFlight extends Document {
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

const RegionalFlightSchema: Schema = new Schema({
    number: {
        type: Number,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    type: {
        type:String,
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

RegionalFlightSchema.pre<IRegionalFlight>('save', function (next) {

    this.isActive = true;
    this.type = 'Regional';

    next();
});


export default model<IRegionalFlight>('RegionalFlight', RegionalFlightSchema, 'Flights');