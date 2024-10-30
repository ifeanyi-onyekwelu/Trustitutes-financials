import { Request, Response } from "@/utils/types";
import User from "@/models/User";
import Transaction from "@/models/Transaction";
import Account from "@/models/Account";
import CustomError from "@/errors/CustomError";
import logger from "@/utils/logger";

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
}

export default AdminController;
