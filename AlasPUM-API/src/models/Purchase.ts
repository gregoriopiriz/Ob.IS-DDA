import { model, Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
    purchaseDate: Date;
    totalPrice: Number;
    buyerEmail: String;
    paymentType: String;
    isActive: Boolean;
}

const PurchaseSchema: Schema = new Schema({
    purchaseDate: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    cvc: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    expiry: {
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

PurchaseSchema.pre<IPurchase>('save', function (next) {

    this.isActive = true;

    next();
});


export default model<IPurchase>('Purchase', PurchaseSchema, 'Purchases');