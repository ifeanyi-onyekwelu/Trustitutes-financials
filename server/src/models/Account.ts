import mongoose, { Schema } from "mongoose";

interface IAccount {
    user: Schema.Types.ObjectId;
    accountNumber: number;
    balance: number;
}

const accountSchema = new Schema<IAccount>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: 0,
        },
        accountNumber: {
            type: Number,
            unique: true,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IAccount>("Account", accountSchema);
