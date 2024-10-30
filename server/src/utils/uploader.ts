import { v2 as cloudinary } from "cloudinary";
const uploadImage = async (imagePath: any) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            unique_filename: true,
            overwrite: true,
            use_filename: true,
        });
        return result.url;
    } catch (err: any) {
        console.error("File upload error:", err); // Log the actual error
        throw new Error(
            err.message || "Unknown error occurred during file upload"
        ); // Use err.message to get a readable error message
    }
};

export default uploadImage;
