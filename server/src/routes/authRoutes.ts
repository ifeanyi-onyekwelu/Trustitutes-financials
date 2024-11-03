import { Router } from "express";
import AuthController from "@/controllers/authController";
import authMiddleware from "@/middlewares/authMiddleware";
import logger from "@/utils/logger";
const router = Router();

const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
