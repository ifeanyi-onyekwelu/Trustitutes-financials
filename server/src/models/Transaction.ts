import mongoose, { Schema } from "mongoose";

interface ITransaction {
    userId: Schema.Types.ObjectId;
    fromAccount: string;
    toAccount: string;
    amount: number;
    status: "pending" | "succeded" | "failed" | "scheduled";
    type:
        | "deposit"
        | "withdrawal"
        | "payment"
        | "transfer"
        | "scheduledTransfer";
    description: string;
    reference: string;
    bankDetails: Schema.Types.ObjectId;
    receipt?: string; // Define receipt as an optional string field
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
            default: "pending",
        },
        type: {
            type: String,
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
        bankDetails: {
            type: Schema.Types.ObjectId,
            ref: "BankDetails",
        },
        receipt: {
            type: String, // Assuming receipt is stored as a URL or path
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
