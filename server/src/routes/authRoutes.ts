import { Router } from "express";
import AuthController from "@/controllers/authController";
import validateLogin from "@/middlewares/validateLogin";
import validateRegister from "@/middlewares/validateRegister";
import authMiddleware from "@/middlewares/authMiddleware";
import logger from "@/utils/logger";
const router = Router();

const authController = new AuthController();

router.post("/login", validateLogin, authController.login);
router.post("/register", validateRegister, authController.register);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/check", authMiddleware, (req, res) => {
    logger.respondWithData(res, { isAuthenticated: true }, 200);
});
export default router;
