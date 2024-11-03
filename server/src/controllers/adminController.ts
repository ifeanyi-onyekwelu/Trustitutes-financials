import { Request, Response } from "@/utils/types";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";
import CustomError from "@/errors/CustomError";
import logger from "@/utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SupportTicket from "@/models/SupportTicket";

class AdminController {
    async getAllAccounts(req: Request, res: Response): Promise<void> {
        try {
            const accounts = await Account.find().populate(
                "user",
                "firstName lastName email"
            );
            return logger.respondWithData(res, { accounts });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async getAccount(req: Request, res: Response): Promise<void> {
        try {
            const { accountId } = req.params;
            const account = await Account.findOne({ _id: accountId }).populate(
                "user",
                "firstName lastName email"
            );

            if (!account)
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found", 404)
                );

            return logger.respondWithData(res, { account });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async getTotalBalance(req: Request, res: Response): Promise<void> {
        try {
            // Use MongoDB aggregation to sum the balance field for all accounts
            const totalBalanceResult = await Account.aggregate([
                {
                    $group: {
                        _id: null, // Group all documents together
                        totalBalance: { $sum: "$balance" }, // Sum the balance field
                    },
                },
            ]);

            // Extract the total balance, or default to 0 if no results are found
            const totalBalance = totalBalanceResult[0]?.totalBalance || 0;

            return logger.respondWithData(res, { totalBalance });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find().select([
                "-password",
                "-refreshToken",
            ]);
            return logger.respondWithData(res, { users });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId }).select(
                "-password"
            );

            if (!user)
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );

            return logger.respondWithData(res, { user });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async suspendUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId }).select(
                "-password"
            );

            if (!user)
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );

            await User.findByIdAndUpdate(user._id, { isActive: false });

            return logger.respondWithData(res, {
                message: `User ${user?.firstName} ${user?.lastName} suspended`,
                user,
            });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async activateUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId }).select(
                "-password"
            );

            if (!user)
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );

            await User.findByIdAndUpdate(user._id, { isActive: true });

            return logger.respondWithData(res, {
                message: `User ${user?.firstName} ${user?.lastName} activated`,
                user,
            });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const user = await User.findOne({ _id: userId }).select(
                "-password"
            );

            const account = await Account.findOne({ user: user?._id });

            if (!user)
                return logger.respondWithError(
                    res,
                    new CustomError("User not found", 404)
                );

            await Transaction.find({ userId: user._id }).deleteMany();

            await User.findByIdAndDelete(user._id, {
                isActive: false,
                isDeleted: true,
            });

            await Account.findByIdAndDelete(account?._id);

            return logger.respondWithData(res, {
                message: `User ${user?.firstName} ${user?.lastName} deleted`,
                user,
            });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async getAllTransactions(req: Request, res: Response): Promise<void> {
        try {
            const transactions = await Transaction.find().populate(
                "userId",
                "firstName lastName email"
            );
            return logger.respondWithData(res, { transactions });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async getTransaction(req: Request, res: Response): Promise<void> {
        try {
            const { transactionId } = req.params;
            const transaction = await Transaction.findOne({
                _id: transactionId,
            }).populate("userId", "firstName lastName email");

            if (!transaction)
                return logger.respondWithError(
                    res,
                    new CustomError("Transaction not found", 404)
                );

            return logger.respondWithData(res, { transaction });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async getAllTickets(req: Request, res: Response): Promise<void> {
        try {
            const tickets = await SupportTicket.find().populate(
                "user",
                "firstName lastName email"
            );
            return logger.respondWithData(res, { tickets });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async replyToTicket(req: Request, res: Response): Promise<void> {
        try {
            const { ticketId } = req.params;
            const { response } = req.body;

            const ticket = await SupportTicket.findById(ticketId);
            if (!ticket) {
                return logger.respondWithError(
                    res,
                    new CustomError("Ticket not found", 404)
                );
            }

            ticket.response = response;
            ticket.status = "resolved";
            ticket.resolvedAt = new Date();
            await ticket.save();

            return logger.respondWithData(res, {
                message: "Response recorded successfully",
                ticket,
            });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { password, email } = req.body;
            const user = await User.findOne({ email }).select([
                "-refreshToken",
            ]);

            if (!user || !user?.isActive || user.isDeleted) {
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found!", 400)
                );
            }

            console.log(user);

            if (!user.roles.includes("admin")) {
                return logger.respondWithError(
                    res,
                    new CustomError("Access Denied", 403)
                );
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return logger.respondWithError(
                    res,
                    new CustomError("Invalid credentials", 400)
                );
            }

            const accessToken = jwt.sign(
                {
                    user: {
                        _id: user._id,
                        email: user.email,
                        roles: user.roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: "15m",
                }
            );

            const refreshToken = jwt.sign(
                {
                    user,
                },
                process.env.REFRESH_TOKEN_SECRET!,
                {
                    expiresIn: "7d",
                }
            );

            res.cookie("jwt", refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 24 * 60 * 60 * 1000,
            });

            await User.findOneAndUpdate({ _id: user._id }, { refreshToken });
            return logger.respondWithData(res, { accessToken }, 200);
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }
    async register(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body;

            // Check if the roles array includes 'admin'
            if (!data.roles || !data.roles.includes("admin")) {
                return logger.respondWithError(
                    res,
                    new CustomError("Only admins can access this route", 403)
                );
            }

            // Check if an admin with the same email already exists
            const existingUser = await User.findOne({ email: data.email });
            if (existingUser) {
                return logger.respondWithError(
                    res,
                    new CustomError("Email is already taken", 409)
                );
            }

            // Create new admin user
            const admin = new User({
                ...data,
                roles: ["user", "admin"],
            });

            await admin.save();

            return logger.respond(
                res,
                `Admin ${admin.firstName} ${admin.lastName} registered successfully!`
            );
        } catch (error: any) {
            return logger.respondWithError(
                res,
                new CustomError(error.message, 500)
            );
        }
    }
}

export default AdminController;
