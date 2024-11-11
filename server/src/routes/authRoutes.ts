import { Router } from "express";
import AuthController from "@/controllers/authController";
const router = Router();
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

const authController = new AuthController();

router.post("/login", authController.login);
router.post("/register", upload.single("image"), authController.register);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
