import { Request, Response } from "@/utils/types";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";
import CustomError from "@/errors/CustomError";
import logger from "@/utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AdminController {
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
                "firstName username lastName"
            ); // Specify the fields to return from the User model
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
    async confirmDeposit(req: Request, res: Response): Promise<void> {
        try {
            const { transactionId } = req.params;
            const transaction = await Transaction.findOne({
                _id: transactionId,
            });

            if (!transaction) {
                return logger.respondWithError(
                    res,
                    new CustomError("Transaction not found", 404)
                );
            }

            const account = await Account.findOne({ user: transaction.userId });

            if (!account) {
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found", 404)
                );
            }

            // Update the account balance
            account.balance += transaction.amount;
            await account.save();

            // Update the transaction status
            transaction.status = "succeded";
            await transaction.save();

            return logger.respondWithData(res, {
                message: `Deposit of ${transaction.amount} confirmed`,
                transaction,
            });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    async confirmWithdrawal(req: Request, res: Response): Promise<void> {
        try {
            const { transactionId } = req.params;
            const transaction = await Transaction.findOne({
                _id: transactionId,
            });

            if (!transaction) {
                return logger.respondWithError(
                    res,
                    new CustomError("Transaction not found", 404)
                );
            }

            const account = await Account.findOne({ user: transaction.userId });

            if (!account) {
                return logger.respondWithError(
                    res,
                    new CustomError("Account not found", 404)
                );
            }

            // Update the account balance
            account.balance -= transaction.amount;
            await account.save();

            // Update the transaction status
            transaction.status = "succeded";
            await transaction.save();

            return logger.respondWithData(res, {
                message: `Withdrawal of ${transaction.amount} confirmed`,
                transaction,
            });
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    /**
     * @route POST /admin/login
     * @description Admin login
     * @access Public
     */
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

    /**
     * @route POST /admin/register
     * @description Register a new admin
     * @access Public
     */
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
