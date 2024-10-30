import mongoose, { Schema } from "mongoose";

interface IFundRequest {
    requester: Schema.Types.ObjectId;
    requestee: Schema.Types.ObjectId;
    amount: number;
    status: "pending" | "accepted" | "rejected";
}

const fundRequestSchema = new Schema<IFundRequest>(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        requestee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: { type: Number, required: true },
        status: {
            type: String,
            required: true,
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IFundRequest>("FundRequest", fundRequestSchema);
