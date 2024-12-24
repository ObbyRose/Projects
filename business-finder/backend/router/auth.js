const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const UserController = require("../controllers/userController");

router.post("/auth/guest-login", authController.guestLogin);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login); 
router.post("/logout", authMiddleware, UserController.logout);
router.get("/profile", authMiddleware, UserController.getProfile);
router.put("/profile", authMiddleware, UserController.updateProfile);
router.put("/upgrade-plan", authMiddleware, UserController.upgradePlan);
router.get("/", adminMiddleware, UserController.getAllUsers);
router.delete("/:id", adminMiddleware, UserController.deleteUser);

module.exports = router;
