import { model, Schema, Document } from 'mongoose';

export interface ISeat extends Document {
    type: String;
    number: String;
    planeId: String;
    isTaken: Boolean;
    isActive: Boolean;
}

const SeatSchema: Schema = new Schema({
    type: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    planeId: {
        type: String,
        required: true
    },
    isTaken: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    }
}, {
    versionKey: false,
    timestamps: true
});

SeatSchema.pre<ISeat>('save', function (next) {

    this.isActive = true;
    this.isTaken = false;

    next();
});


export default model<ISeat>('Seat', SeatSchema, 'Seats');