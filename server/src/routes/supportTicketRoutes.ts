import express from "express";
const router = express.Router();
import SupportTicketController from "@/controllers/support.controller";

// Middleware to protect routes
import protect from "@/middlewares/authMiddleware";

// Create an instance of the TransactionController
const supportTicketController = new SupportTicketController();

// Routes
router.post("/create", protect, supportTicketController.createTicket);
router.get("/all", protect, supportTicketController.getAllSupportTicket);
router.get("/:ticketId", protect, supportTicketController.getASupportTicket);

export default router;
