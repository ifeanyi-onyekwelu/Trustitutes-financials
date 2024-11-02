import mongoose, { Schema } from "mongoose";

interface ITransaction {
    userId: Schema.Types.ObjectId;
    fromAccount: string;
    toAccount: string;
    amount: number;
    status: "pending" | "succeded" | "failed";
    type: "deposit" | "withdrawal" | "bill-payment" | "transfer";
    description: string;
    reference: string;
    date: Date;
}

const transactionSchema = new Schema<ITransaction>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fromAccount: {
            type: String,
            required: function () {
                return this.type === "transfer";
            },
        },
        toAccount: {
            type: String,
            required: function () {
                return this.type === "transfer";
            },
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "succeded", "failed"],
            default: "pending",
        },
        type: {
            type: String,
            enum: ["deposit", "withdrawal", "bill-payment", "transfer"],
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
    },
    { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
