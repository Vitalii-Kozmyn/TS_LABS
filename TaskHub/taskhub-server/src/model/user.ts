import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    passwordHash: string;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;