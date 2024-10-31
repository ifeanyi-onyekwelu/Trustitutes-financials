import { Request, Response, NextFunction } from "@/utils/types";

function getUserIp(req: Request, res: Response, next: NextFunction) {
    // If x-forwarded-for header exists, get the first IP in the list
    const forwarded = req.headers["x-forwarded-for"] as string;
    const ipAddress = forwarded
        ? forwarded.split(",")[0] // In case of multiple IPs, take the first one
        : req.connection.remoteAddress || req.socket.remoteAddress;

    req.userIp = ipAddress;
    next();
}

export default getUserIp;
