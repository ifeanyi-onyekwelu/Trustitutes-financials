import mongoose, { Schema } from "mongoose";

interface IBankDetails {
    accountNumber: string;
    accountName: string;
    bankName: string;
}

export const bankDetailsSchema = new Schema<IBankDetails>({
    accountName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
});

export default mongoose.model<IBankDetails>("BankDetails", bankDetailsSchema);
