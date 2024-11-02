import { Router } from "express";
const router = Router();

import authRoutes from "./authRoutes";
import transactionRoutes from ".//transactionRoutes";
import userRoutes from "./userRoutes";
import supportTicketRoutes from "./supportTicketRoutes";
import adminRoutes from "./adminRoutes";

router.use("/auth", authRoutes);
router.use("/transact", transactionRoutes);
router.use("/profile", userRoutes);
router.use("/support-ticket", supportTicketRoutes);
router.use("/admin", adminRoutes);

export default router;
