import express from "express";
import UserController from "@/controllers/userController";

import protect from "@/middlewares/authMiddleware";
import checkUserSetup from "@/middlewares/checkUserSetup";

const router = express.Router();
const userController = new UserController();

// Routes for userController
router.post(
    "/update-profile-information",
    protect,
    userController.updateUserProfile
);
router.post(
    "/upload-profile-picture",
    protect,
    userController.uploadProfileImage
);
router.get("/check-username", protect, userController.checkUserName);
router.post("/change-password", protect, userController.changePassword);
router.post(
    "/update-contact-information",
    protect,
    userController.updateContactInfo
);
router.get("/get-profile", protect, userController.getUserProfile);
router.get("/get-account", protect, userController.getUserAccount);

router.post("/delete-account", protect, userController.deleteAccount);
router.post("/pause-account", protect, userController.pauseAccount);
router.post("/resume-account", protect, userController.resumeAccount);

export default router;
