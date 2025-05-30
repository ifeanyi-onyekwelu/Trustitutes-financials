import User from "@/models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "@/utils/types";
import logger from "@/utils/logger";
import CustomError from "@/errors/CustomError";
import multer from "multer";
import uploadImage from "@/utils/uploader";
import Account from "@/models/Account";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage });

class UserController {
    /**
     * @route POST /profile/update-profile/:userId
     * @description Update user profile
     * @access Protected
     * @expected-response {object} - Object containing a message indicating success or failure, along with the updated user
     * @error-handling - Returns a 500 error if an unexpected error occurs during the updating process
     */
    async updateUserProfile(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // Fetch the current user to check the existing email
            const existingUser = await User.findById(req.user._id);

            if (!existingUser) {
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );
            }

            // Check if the email is different and validate uniqueness
            if (data.email && data.email !== existingUser.email) {
                const emailExists = await User.findOne({ email: data.email });
                if (emailExists) {
                    return logger.respondWithError(
                        res,
                        new CustomError("Email is already in use", 400)
                    );
                }
            }

            // Proceed with updating the user profile
            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { ...data },
                { new: true } // `new: true` returns the updated document
            );

            return logger.respondWithData(
                res,
                {
                    message: "User profile updated successfully",
                    user: updatedUser,
                },
                200
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /profile/upload-profile-picture/:userId
     * @description Upload a new profile picture
     * @access Protected
     * @input {file} file - The file to upload
     * @expected-response {object} - Object containing a message indicating success or failure, along with the uploaded profile picture
     * @error-handling - Returns a 500 error if an unexpected error occurs during the change password process
     */

    async uploadProfileImage(req: Request, res: Response) {
        upload.single("file")(req, res, async (err) => {
            try {
                if (err) {
                    console.error("Error during file upload:", err);
                    return res
                        .status(400)
                        .send({ error: "Invalid file format" });
                }
                const imageUrl = (await uploadImage(req.file.path)) || "";

                const user = await User.findById(req.user._id);
                if (!user) {
                    console.error("User not found for ID:", req.user._id);
                    return res.status(404).send({ error: "User not found" });
                }

                user.profilePicture = imageUrl;
                await user.save();

                return res.status(200).send({
                    message: "Upload successful!",
                    status: true,
                    file: req.file,
                });
            } catch (err: any) {
                console.error("Error during image upload:", err);
                return res.status(500).send({ error: "Internal server error" });
            }
        });
    }

    /**
     * @route POST /profile/change-password/:userId
     * @description Change user password
     * @access Protected
     * @input {string} currentPassword - User's current password
     * @input {string} newPassword - New password to be used
     * @expected-response {object} - Object containing a message indicating success or failure, along with the updated user
     * @error-handling - Returns a 500 error if an unexpected error occurs during the change password process
     */
    async changePassword(req: Request, res: Response): Promise<void> {
        try {
            const { currentPassword, newPassword } = req.body;

            const user = await User.findById(req.user._id);

            if (!currentPassword || !newPassword) {
                return logger.respondWithError(
                    res,
                    new CustomError(
                        "Current password and new password must be provided!",
                        400
                    )
                );
            }

            if (!user) {
                return logger.respondWithError(
                    res,
                    new CustomError("User not found!", 404)
                );
            }

            // Validate current password
            const isPasswordValid = await bcrypt.compare(
                currentPassword,
                user.password
            );

            if (!isPasswordValid) {
                return logger.respondWithError(
                    res,
                    new CustomError("Current password is incorrect", 400)
                );
            }

            // Change password
            user.password = newPassword;
            await user.save();

            return logger.respondWithData(
                res,
                {
                    message: "Password changed successfully",
                },
                200
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route GET /profile/get-profile
     * @description Get user's profile
     * @access Protected
     * @expected-response {object} - Object containing the user's profile information
     * @error-handling - Returns a 500 error if an unexpected error occurs during the retrieval process
     */
    async getUserProfile(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.user._id).select([
                "-password",
                "-refreshToken",
            ]);

            if (!user) {
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );
            }

            return logger.respondWithData(
                res,
                { user, ipAddress: req.userIp },
                200
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route GET /profile/get-account
     * @description Get user's account information
     * @access Protected
     * @expected-response {object} - Object containing the user's account information
     * @error-handling - Returns a 500 error if an unexpected error occurs during the retrieval process
     */
    async getUserAccount(req: Request, res: Response): Promise<void> {
        try {
            const account = await Account.findOne({ user: req.user._id });

            if (!account) {
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found", 404)
                );
            }

            return logger.respondWithData(res, { account }, 200);
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /profile/delete-account
     * @description Delete user's account information
     * @access Protected
     * @expected-response {object} - null
     * @error-handling - Returns a 500 error if an unexpected error occurs during the deletion process
     */
    async deleteAccount(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.user._id);

            await User.findByIdAndUpdate(user?._id, {
                isDeleted: true,
                isActive: false,
            });

            return logger.respondWithData(
                res,
                { message: "Account deleted successfully" },
                200
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /profile/pause-account
     * @description Pause user's account information
     * @access Protected
     * @expected-response {object} - null
     * @error-handling - Returns a 500 error if an unexpected error occurs during the pausing process
     */
    async pauseAccount(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.user._id);

            await User.findByIdAndUpdate(user?._id, {
                isActive: false,
            });

            return logger.respondWithData(
                res,
                { message: "Account paused successfully" },
                200
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }

    /**
     * @route POST /profile/delete-account
     * @description Delete user's account information
     * @access Protected
     * @expected-response {object} - null
     * @error-handling - Returns a 500 error if an unexpected error occurs during the activating process
     */
    async resumeAccount(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.findById(req.user._id);

            await User.findByIdAndUpdate(user?._id, {
                isActive: false,
            });

            return logger.respondWithData(
                res,
                { message: "Account activated successfully" },
                200
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }
}

export default UserController;
