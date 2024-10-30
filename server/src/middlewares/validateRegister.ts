import { Response, Request, NextFunction } from "@/utils/types";
import asyncHandler from "express-async-handler";
import CustomError from "@/errors/CustomError";
import ValidationError from "@/errors/ValidationError";
import logger from "@/utils/logger";
import User from "@/models/User";
import ConflictError from "@/errors/ConflictError";

const validateRegister = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            roles,
            passcode,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !username ||
            !password ||
            !email ||
            !roles.length ||
            !Array.isArray(roles)
        ) {
            return logger.respondWithError(
                res,
                new ValidationError(
                    "First name, last name, username, email, password and roles must be provided"
                )
            );
        }

        if (passcode && passcode !== "5500")
            return logger.respondWithError(
                res,
                new ValidationError("Not allowed!")
            );

        const usernameMatch = await User.findOne({ username });
        if (usernameMatch) {
            return logger.respondWithError(
                res,
                new ConflictError("Username already in use")
            );
        }

        const emailMatch = await User.findOne({ email });
        if (emailMatch) {
            return logger.respondWithError(
                res,
                new ConflictError("Email address already in use")
            );
        }

        next();
    }
);

export default validateRegister;
