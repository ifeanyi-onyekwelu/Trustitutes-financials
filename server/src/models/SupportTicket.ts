import mongoose, { Schema } from "mongoose";

interface ISupportTicket {
    user: Schema.Types.ObjectId;
    department: string;
    complaint: string;
    status: string;
    response?: string;
    resolvedAt?: Date;
}

const supportTicketSchema = new Schema<ISupportTicket>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        complaint: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["open", "in-progress", "resolved"],
            default: "open",
        },
        response: {
            type: String,
            default: null,
        },
        resolvedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ISupportTicket>(
    "SupportTicket",
    supportTicketSchema
);
