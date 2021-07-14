import { model, Schema, Document } from 'mongoose';

export interface ITicket extends Document {
    departureDate: Date;
    documentation: String;
    fullName: String;
    flightNumber: String;
    planeNumber: String;
    isActive: Boolean;
}

const TicketSchema: Schema = new Schema({
    departureDate: {
        type: Date,
        required: true
    },
    documentation: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true
    },
    planeNumber: {
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

TicketSchema.pre<ITicket>('save', function (next) {

    this.isActive = true;

    next();
});


export default model<ITicket>('Ticket', TicketSchema, 'Tickets');