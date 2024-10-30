// middleware/checkUserSetup.js
import User from "@/models/User";
import { Request, Response, NextFunction } from "@/utils/types";
import logger from "@/utils/logger";
import CustomError from "@/errors/CustomError";

const checkUserSetup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return logger.respondWithError(
                res,
                new CustomError("User not found", 404)
            );
        }

        if (!user.isActive) {
            return logger.respondWithError(
                res,
                new CustomError(
                    "Activate your account to perform transactions",
                    404
                )
            );
        }

        // Check if account is verified
        if (!user.isVerified) {
            return logger.respondWithError(
                res,
                new CustomError(
                    "Please verify your account before proceeding",
                    404
                )
            );
        }

        // If all setup tasks are completed, proceed to the next middleware or route handler
        next();
    } catch (error: any) {
        console.error("Error checking user setup:", error);
        return logger.respondWithError(
            res,
            new CustomError(error.message, 404)
        );
    }
};

export default checkUserSetup;
