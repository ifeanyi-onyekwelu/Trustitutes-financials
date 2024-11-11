import express from "express";
import UserController from "@/controllers/userController";

import protect from "@/middlewares/authMiddleware";
import checkUserSetup from "@/middlewares/checkUserSetup";
import getUserIp from "@/middlewares/getUserIp";

import multer from "multer";

const router = express.Router();
const userController = new UserController();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

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
router.post("/change-password", protect, userController.changePassword);

router.get("/get-profile", protect, getUserIp, userController.getUserProfile);
router.get("/get-account", protect, userController.getUserAccount);

router.post("/delete-account", protect, userController.deleteAccount);
router.post("/pause-account", protect, userController.pauseAccount);
router.post("/resume-account", protect, userController.resumeAccount);

export default router;
