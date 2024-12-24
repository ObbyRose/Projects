import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import UserController from "../controllers/userController.js";

// Guest login
router.post("/auth/guest-login", UserController.guestLogin);

// User login and signup
router.post("/signup", UserController.signup);
router.post("/login", UserController.login); 

// Protected routes (require authentication)
router.post("/logout", authMiddleware, UserController.logout);
router.get("/profile", authMiddleware, UserController.getProfile);
router.put("/profile", authMiddleware, UserController.updateProfile);
router.put("/upgrade-plan", authMiddleware, UserController.upgradePlan);

// Admin routes (require admin privileges)
router.get("/", adminMiddleware, UserController.getAllUsers);
router.delete("/:id", adminMiddleware, UserController.deleteUser);

export default router;
