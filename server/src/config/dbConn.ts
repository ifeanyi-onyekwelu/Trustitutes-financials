import mongoose from "mongoose";

const dbConn = async () => {
    const CONNECTION_STRING =
        process.env.NODE_ENV === "production"
            ? process.env.CLOUD_DB_URI
            : process.env.LOCAL_DB_URI;

    try {
        await mongoose.connect(CONNECTION_STRING || "");
    } catch (err: any) {
        throw new Error(err);
    }
};

export default dbConn;
