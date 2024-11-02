import SupportTicket from "@/models/SupportTicket";
import { Request, Response } from "@/utils/types";
import logger from "@/utils/logger";
import CustomError from "@/errors/CustomError";
import User from "@/models/User";

class SupportTicketController {
    async createTicket(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;
            const user = await User.findById(req.user._id);

            const supportTicket = new SupportTicket({
                ...data,
                user: user?._id,
            });

            await supportTicket.save();

            return logger.respond(
                res,
                `Support ticket submitted successfully!`
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }
    async getAllSupportTicket(req: Request, res: Response): Promise<void> {
        const supportTickets = await SupportTicket.find({
            user: req.user._id,
        });

        return logger.respondWithData(
            res,
            { message: "Support Tickets retreived: ", supportTickets },
            200
        );
    }

    async getASupportTicket(req: Request, res: Response): Promise<void> {
        const { ticketId } = req.params;

        const supportTicket = await SupportTicket.findById(ticketId);

        return logger.respondWithData(
            res,
            { message: "Support Ticket retreived: ", supportTicket },
            200
        );
    }
}

export default SupportTicketController;
