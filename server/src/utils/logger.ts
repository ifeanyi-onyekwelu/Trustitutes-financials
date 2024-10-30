import { Request, Response } from "./types";
import CustomError from "@/errors/CustomError";

const logger = {
    log: (message: string) => {
        console.log(message);
    },
    error: (error: Error) => {
        console.error(error);
    },
    respond: (res: Response, message: string, statusCode: number = 200) => {
        res.status(statusCode).json({ message });
    },
    respondWithData: (res: Response, data: any, statusCode: number = 200) => {
        res.status(statusCode).json(data);
    },
    respondWithError: (res: Response, error: CustomError) => {
        res.status(error.statusCode || 500).json({ message: error.message });
    },
};

export default logger;
