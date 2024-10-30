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
        cb(null, "build/uploads/profile_pictures");
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
     * @input {string} firstName - First name of the user
     * @input {string} lastName - First name of the user
     * @input {string} username - Username of the user
     * @expected-response {object} - Object containing a message indicating success or failure, along with the updated user
     * @error-handling - Returns a 500 error if an unexpected error occurs during the updating process
     */
    async updateUserProfile(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, username } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { firstName, lastName, username },
                { new: true }
            );

            if (!updatedUser) {
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );
            }

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
     * @route GET /profile/check-user?username=<username>
     * @description Check if username is already taken
     * @access Protected
     * @expected-response {object} - Object containing the status if the username is already taken
     * @error-handling - Returns a 500 error if an unexpected error occurs during the retrieval process
     */
    async checkUserName(req: Request, res: Response): Promise<void> {
        try {
            const username = req.query.username;
            const user = await User.findOne({ username });

            if (user) {
                return logger.respondWithData(
                    res,
                    { success: false, message: "Username taken" },
                    400
                );
            } else {
                return logger.respondWithData(
                    res,
                    { success: true, message: "Username available" },
                    200
                );
            }
        } catch (err: any) {
            console.log("Error fetching account info", err);
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
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

    async uploadProfileImage(req: Request, res: Response): Promise<void> {
        upload.single("file")(req, res, async (err) => {
            try {
                if (err) return res.status(500).send({ error: err });

                const imageUrl = (await uploadImage(req.file.path)) || "";

                const user = await User.findById(req.user._id);
                if (!user)
                    return logger.respondWithError(
                        res,
                        new CustomError("User not found", 404)
                    );

                user.profilePicture = imageUrl;
                await user.save();

                return logger.respondWithData(
                    res,
                    {
                        message: "Upload successful!",
                        status: true,
                        file: req.file,
                    },
                    200
                );
            } catch (err: any) {
                return logger.respondWithError(
                    res,
                    new CustomError(err.message, 500)
                );
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

            console.log(currentPassword);
            console.log(newPassword);

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

            console.log(isPasswordValid);

            if (!isPasswordValid) {
                return logger.respondWithError(
                    res,
                    new CustomError("Current password is incorrect", 401)
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
     * @route POST /profile/update-contact-info/:userId
     * @description Update user's contact info
     * @access Protected
     * @input {string} address - User's address
     * @input {string} state - User's state
     * @input {string} zipcode - User's zipcode
     * @input {string} country - User's country
     * @expected-response {object} - Object containing a message indicating success or failure, along with the updated user's contact infp
     * @error-handling - Returns a 500 error if an unexpected error occurs during the updating process
     */
    async updateContactInfo(req: Request, res: Response): Promise<void> {
        try {
            const { address, state, zipcode, country } = req.body;

            const updatedUser = await User.findByIdAndUpdate(
                req.user._id,
                { address, state, zipcode, country },
                { new: true }
            );

            if (!updatedUser) {
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );
            }

            return logger.respondWithData(
                res,
                {
                    message: "Contact information updated successfully",
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

            return logger.respondWithData(res, { user }, 200);
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
