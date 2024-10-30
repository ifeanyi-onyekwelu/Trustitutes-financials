import { Response, Request, NextFunction } from "@/utils/types";
import asyncHandler from "express-async-handler";
import CustomError from "@/errors/CustomError";
import ValidationError from "@/errors/ValidationError";
import logger from "@/utils/logger";

const validateFundAccount = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { refrence, amount, userId } = req.body;

        if (!refrence || !amount || !userId) {
            return logger.respondWithError(
                res,
                new ValidationError("Refrence and amount are required!")
            );
        }

        next();
    }
);

export default validateFundAccount;
