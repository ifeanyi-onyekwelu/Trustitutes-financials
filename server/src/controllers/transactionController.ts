import Account from "@/models/Account";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import mongoose from "mongoose";
import { Request, Response } from "@/utils/types";
import logger from "@/utils/logger";
import CustomError from "@/errors/CustomError";
import generateRandomReference from "@/utils/generateRefence";
import uploadImage from "@/utils/uploader";
import { emailService } from "..";

class TransactionController {
    /**
     * @route POST /transact/fund-account
     * @description Fund user account by creating a new transaction
     * @access Protected
     * @input {string} refrence - Reference for the transaction
     * @input {number} amount - Amount to be funded
     * @input {string} userId - ID of the user whose account is to be funded
     * @expected-response {object} - Object containing a message indicating success or failure
     * @error-handling - Returns a 500 error if an unexpected error occurs during the transaction process
     */
    async fundAccount(req: Request, res: Response): Promise<void> {
        try {
            const { amount } = req.body;

            await Transaction.create({
                userId: req.user._id,
                amount,
                type: "deposit",
                reference: generateRandomReference(),
                status: "succeded",
            });

            const userAccount = await Account.findOne({
                user: req.user._id,
            });

            const account = await Account.findOneAndUpdate(
                { _id: userAccount?._id },
                { $inc: { balance: amount } }
            );

            await emailService.sendDepositNotification(
                userAccount,
                account,
                amount
            );
            return logger.respond(res, "Deposit notification received!", 200);
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    /**
     * @route POST /transact/transfer
     * @description Transfer funds from one account to another
     * @access Protected
     * @input {string} toAccountNumber - Account number to which funds will be transferred
     * @input {number} amount - Amount to be transferred
     * @expected-response {object} - Object containing a message indicating success or failure
     * @error-handling - Returns a 500 error if an unexpected error occurs during the transfer process
     */
    async transferFund(req: Request, res: Response): Promise<void> {
        try {
            const { toAccountNumber, amount } = req.body;

            // Find the account from which funds will be transferred (current user's account)
            const fromAccount = await Account.findOne({
                user: req.user._id,
            });

            if (!fromAccount) {
                return logger.respondWithError(
                    res,
                    new CustomError(
                        "Account not found for the current user",
                        404
                    )
                );
            }

            // Find the account to which funds will be transferred (recipient's account)
            const toAccount = await Account.findOne({
                accountNumber: toAccountNumber,
            })
                .populate("user")
                .select("-password");

            if (!toAccount) {
                return logger.respondWithError(
                    res,
                    new CustomError("Recipient account not found", 404)
                );
            }

            // Check if there's sufficient balance
            if (fromAccount.balance < amount) {
                return logger.respondWithError(
                    res,
                    new CustomError("Insufficient balance", 400)
                );
            }

            // Deduct amount from `fromAccount` and update in database
            await Account.findOneAndUpdate(
                { _id: fromAccount._id },
                { $inc: { balance: -amount } }
            );

            // Add amount to `toAccount` and update in database
            await Account.findOneAndUpdate(
                { _id: toAccount._id },
                { $inc: { balance: amount } }
            );

            // Create a new transaction record
            const newTransaction = new Transaction({
                userId: req.user._id,
                fromAccount: fromAccount.accountNumber,
                toAccount: toAccountNumber,
                amount,
                status: "succeded",
                type: "transfer",
                description: `Transfer of ${amount} to ${toAccount.accountNumber}`,
                reference: generateRandomReference(),
            });

            // Respond with success message
            await newTransaction.save();
            return logger.respond(res, "Funds transferred successfully!", 200);
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    /**
     * @route POST /transact/withdraw
     * @description Withdraw funds from account
     * @access Protected
     * @input {string} bank name - Account number to which funds will be transferred
     * @input {string} Account Number - Account number to which funds will be transferred
     * @input {string} Account Name - Account number to which funds will be transferred
     * @input {number} amount - Amount to be transferred
     * @expected-response {object} - Object containing a message indicating success or failure
     * @error-handling - Returns a 500 error if an unexpected error occurs during the withdrawal process
     */
    async withdrawFunds(req: Request, res: Response): Promise<void> {
        try {
            const { bankName, accountNumber, accountName, amount } = req.body;

            // Find the account from which funds will be transferred (current user's account)
            const userAccount = await Account.findOne({
                user: req.user._id,
            });

            if (!userAccount) {
                return logger.respondWithError(
                    res,
                    new CustomError(
                        "Account not found for the current user",
                        404
                    )
                );
            }

            // Check if there's sufficient balance
            if (userAccount.balance < amount) {
                return logger.respondWithError(
                    res,
                    new CustomError("Insufficient balance", 400)
                );
            }

            // Deduct amount from `fromAccount` and update in database
            await Account.findOneAndUpdate(
                { _id: userAccount._id },
                { $inc: { balance: -amount } }
            );

            // Create a new transaction record
            const newTransaction = new Transaction({
                userId: req.user._id,
                amount,
                status: "success",
                type: "withdrawal",
                description: `Withdraw of ${amount} to ${bankName}, ${accountName}`,
                reference: generateRandomReference(),
            });

            await newTransaction.save();
            return logger.respond(
                res,
                "Withdraw request sent successfully!",
                200
            );
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    /**
     * @route GET /transact/get-account
     * @description Display account details for a given account number
     * @access Protected
     * @query {string} accountNumber - Account number for which details are to be fetched
     * @expected-response {object} - Object containing account details if found, or a failure message
     * @error-handling - Returns a 500 error if an unexpected error occurs during the retrieval process
     */
    async getAccountInfo(req: Request, res: Response): Promise<void> {
        try {
            const accountNumber = req.query.accountNumber;
            const account = await Account.findOne({ accountNumber })
                .populate("user")
                .select(["-password", "-refreshToken"]);

            if (account) {
                return logger.respondWithData(
                    res,
                    { success: true, user: account.user },
                    200
                );
            } else {
                return logger.respondWithData(res, { success: false }, 404);
            }
        } catch (err: any) {
            console.log("Error fetching account info", err);
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    /**
     * @route GET /transact/get-all-transactions
     * @description Get all transactions for the current user
     * @access Protected
     * @expected-response {object} - Object containing a message indicating success or failure, along with the list of transactions
     * @error-handling - Returns a 500 error if an unexpected error occurs during the retrieval process
     */
    async getAllTransactions(req: Request, res: Response): Promise<void> {
        try {
            const account = await Account.findOne({
                user: req.user._id,
            }).lean();

            const transactions = await Transaction.find({
                $or: [
                    { userId: req.user._id },
                    { toAccount: account?.accountNumber },
                ],
            });

            return logger.respondWithData(
                res,
                { message: "Transactions retreived: ", transactions },
                200
            );
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }

    /**
     * @route GET /transact/get-transaction
     * @description Get the transaction matching the provided ID
     * @param {string} id The transaction ID
     * @access Protected
     * @expected-response {object} - Object containing a message indicating success or failure, along with the list of transactions
     * @error-handling - Returns a 500 error if an unexpected error occurs during the retrieval process
     */
    async getTransaction(req: Request, res: Response): Promise<void> {
        try {
            const { transactionId } = req.params;

            const transaction = await Transaction.findById(transactionId);

            if (!transaction)
                return logger.respondWithError(
                    res,
                    new CustomError("Transaction not found", 400)
                );

            return logger.respondWithData(
                res,
                { message: "Transaction retreived: ", transaction },
                200
            );
        } catch (err: any) {
            return logger.respondWithError(
                res,
                new CustomError(err.message, 500)
            );
        }
    }
}

export default TransactionController;
