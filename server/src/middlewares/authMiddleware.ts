import { NextFunction, Request, Response } from "@/utils/types";
import jwt from "jsonwebtoken";
import logger from "@/utils/logger";
import CustomError from "@/errors/CustomError";
import AuthenticationError from "@/errors/AuthenticationError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["Authorization"]
        ? req.headers["Authorization"]
        : req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return logger.respondWithError(
            res,
            new AuthenticationError("Not authenticated")
        );

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "",
        (err: any, decoded: any) => {
            if (err)
                return logger.respondWithError(
                    res,
                    new CustomError(
                        `AUTHENTICATION ERROR:${err.message}`,
                        err.statusCode
                    )
                );
            req.user = decoded.user;
            next();
        }
    );
};

export default authMiddleware;
