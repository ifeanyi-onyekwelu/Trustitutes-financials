import { Router } from "express";
import AdminController from "@/controllers/adminController";
import protect from "@/middlewares/authMiddleware";
import adminOnly from "@/middlewares/adminOnly";

const router = Router();
const adminController = new AdminController();

router.post("/register", adminController.register);
router.post("/login", adminController.login);

router.get("/users", protect, adminOnly, adminController.getAllUsers);
router.get(
    "/transactions",
    protect,
    adminOnly,
    adminController.getAllTransactions
);

router.get("/users/:userId", protect, adminOnly, adminController.getUser);

router.get("/accounts", protect, adminOnly, adminController.getAllAccounts);
router.post(
    "/accounts/:accountId/update",
    protect,
    adminOnly,
    adminController.updateUserBalance
);
router.get(
    "/total-balance",
    protect,
    adminOnly,
    adminController.getTotalBalance
);
router.get(
    "/accounts/:accountId",
    protect,
    adminOnly,
    adminController.getAccount
);

router.put(
    "/users/suspend-user/:userId",
    protect,
    adminOnly,
    adminController.suspendUser
);
router.put(
    "/users/activate-user/:userId",
    protect,
    adminOnly,
    adminController.activateUser
);
router.put(
    "/users/block-user/:userId",
    protect,
    adminOnly,
    adminController.blockUser
);
router.put(
    "/users/unblock-user/:userId",
    protect,
    adminOnly,
    adminController.unblockUser
);
router.put(
    "/users/delete-user/:userId",
    protect,
    adminOnly,
    adminController.deleteUser
);
router.get(
    "/transactions/:transactionId",
    protect,
    adminOnly,
    adminController.getTransaction
);
router.put(
    "/transactions/:transactionId/update",
    protect,
    adminOnly,
    adminController.updateTransactionDate
);
router.get(
    "/support-tickets",
    protect,
    adminOnly,
    adminController.getAllTickets
);
router.post(
    "/support-tickets/:ticketId/reply",
    protect,
    adminOnly,
    adminController.replyToTicket
);
router.get(
    "/support-tickets/:ticketId",
    protect,
    adminOnly,
    adminController.getASupportTicket
);

export default router;
