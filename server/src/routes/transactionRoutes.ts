// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
import TransactionController from "@/controllers/transactionController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (_: any, any, cb) => {
        cb(null, "build/uploads/receipts");
    },
    filename: (_: any, file: any, cb: any) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({ storage });

// Middleware to protect routes
import protect from "@/middlewares/authMiddleware";
import checkUserSetup from "@/middlewares/checkUserSetup";

// Create an instance of the TransactionController
const transactionController = new TransactionController();

// Routes
router.post(
    "/deposit",
    protect,
    checkUserSetup,
    upload.single("receipt"),
    transactionController.fundAccount
);
router.post(
    "/transfer",
    protect,
    checkUserSetup,
    transactionController.transferFund
);
router.post(
    "/withdraw",
    protect,
    checkUserSetup,
    transactionController.withdrawFunds
);
router.get(
    "/get-account",
    protect,
    checkUserSetup,
    transactionController.getAccountInfo
);
router.get(
    "/transactions",
    protect,
    checkUserSetup,
    transactionController.getAllTransactions
);
router.get(
    "/transactions/:transactionId",
    protect,
    checkUserSetup,
    transactionController.getTransaction
);
export default router;
