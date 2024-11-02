import mongoose, { Schema } from "mongoose";

interface ISupportTicket {
    user: Schema.Types.ObjectId;
    department: string;
    complaint: string;
}

const supportTicketSchema = new Schema<ISupportTicket>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: 0,
        },
        department: {
            type: String,
            required: true,
        },
        complaint: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<ISupportTicket>(
    "SupportTicket",
    supportTicketSchema
);
