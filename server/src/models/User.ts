import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IRole {
    value: string;
}

interface IUser {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken: string;
    profilePicture: string;
    address: string;
    state: string;
    city: string;
    phoneNumber: string;
    ssn: string;
    zipcode: string;
    country: string;
    roles: IRole[];
    isVerified: boolean;
    isDeleted: boolean;
    isActive: boolean;
}

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: String,
            },
        ],
        refreshToken: {
            type: String,
            required: false,
        },
        profilePicture: {
            type: String,
        },
        address: String,
        city: String,
        phoneNumber: String,
        ssn: String,
        state: String,
        zipcode: String,
        country: String,
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

export default mongoose.model<IUser>("User", userSchema);
