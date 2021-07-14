import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: String;
    password: String;
    comparePasswords: (password: String) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
},{
    versionKey: false,
    timestamps: true
});

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
});

UserSchema.methods.comparePasswords = async function (password:String): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', UserSchema, 'Users');