import { model, Schema, Document } from 'mongoose';

export interface IPrice extends Document {
    from?:Date,
    to?: Date
    date?: Date,
    economyPrice: Number;
    premiumPrice: Number;
    businessPrice: Number;
    firstClassPrice: Number;
    flightNumber: Number;
    isActive: Boolean
}

const PriceSchema: Schema = new Schema({
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    economyPrice: {
        type: Number
    },
    premiumPrice: {
        type: Number
    },
    businessPrice: {
        type: Number
    },
    firstClassPrice: {
        type: Number
    },
    flightNumber: {
        type: Number
    },
    isActive : {
        type: Boolean
    }
},{
    versionKey: false,
    timestamps: true
});

PriceSchema.pre<IPrice>('save', function (next) {

    this.isActive = true;

    next();
});


export default model<IPrice>('Price', PriceSchema, 'Prices');