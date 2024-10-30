import { Response, Request, NextFunction } from "@/utils/types";
import asyncHandler from "express-async-handler";
import CustomError from "@/errors/CustomError";
import ValidationError from "@/errors/ValidationError";
import logger from "@/utils/logger";
import User from "@/models/User";

const validateLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { emailOrUsername, password } = req.body;

        if (!emailOrUsername || !password) {
            return logger.respondWithError(
                res,
                new ValidationError(
                    "Email Address or Username and Password must be provided"
                )
            );
        }

        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        }).select("-refreshToken");
        if (!user || user.isDeleted || !user.isActive) {
            return logger.respondWithError(
                res,
                new CustomError("Account not found!", 400)
            );
        }

        req.user = user;
        next();
    }
);

export default validateLogin;
