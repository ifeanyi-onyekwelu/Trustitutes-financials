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
    "/users/delete-user/:userId",
    protect,
    adminOnly,
    adminController.deleteUser
);
router
    .get(
        "/transactions/:transactionId",
        protect,
        adminOnly,
        adminController.getTransaction
    )
    .put(
        "/transactions/confirm-deposit/:transactionId",
        protect,
        adminOnly,
        adminController.confirmDeposit
    )
    .put(
        "/transactions/confirm-withdrawal/:transactionId",
        protect,
        adminOnly,
        adminController.confirmWithdrawal
    );

export default router;
