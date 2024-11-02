// routes/transactionRoutes.js
import express from "express";
const router = express.Router();
import TransactionController from "@/controllers/transactionController";

// Middleware to protect routes
import protect from "@/middlewares/authMiddleware";

// Create an instance of the TransactionController
const transactionController = new TransactionController();

// Routes
router.post("/deposit", protect, transactionController.fundAccount);
router.post("/transfer", protect, transactionController.transferFund);
router.post("/withdraw", protect, transactionController.withdrawFunds);
router.get("/get-account", protect, transactionController.getAccountInfo);
router.get("/transactions", protect, transactionController.getAllTransactions);
router.get(
    "/transactions/:transactionId",
    protect,
    transactionController.getTransaction
);
export default router;
