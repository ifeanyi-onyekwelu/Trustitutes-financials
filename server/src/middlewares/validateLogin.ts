import { Response, Request, NextFunction } from "@/utils/types";
import asyncHandler from "express-async-handler";
import CustomError from "@/errors/CustomError";
import ValidationError from "@/errors/ValidationError";
import logger from "@/utils/logger";
import User from "@/models/User";
import Account from "@/models/Account";

const validateLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { accountNumber, password } = req.body;

        if (!accountNumber || !password) {
            return logger.respondWithError(
                res,
                new ValidationError(
                    "Email Address or Username and Password must be provided"
                )
            );
        }

        const account = await Account.findOne({ accountNumber });
        if (!account) {
            return logger.respondWithError(
                res,
                new CustomError("Account not found!", 400)
            );
        }

        const user = await User.findById(account?.user);
        if (!user || !user?.isActive || user.isDeleted) {
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
