import CustomError from "@/errors/CustomError";
import User from "@/models/User";
import logger from "@/utils/logger";
import { NextFunction, Request, Response } from "@/utils/types";

const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user.roles.includes("admin"))
            return logger.respondWithError(
                res,
                new CustomError("Access denied", 400)
            );

        next();
    } catch (err: any) {
        return logger.respondWithError(res, new CustomError(err.message, 500));
    }
};

export default adminOnly;
