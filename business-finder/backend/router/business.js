import express from "express";
const router = express.Router();
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import BusinessController from "../controllers/businessController.js";

router.get("/", BusinessController.getBusinesses);
router.post("/", authMiddleware, BusinessController.createBusiness);
router.put("/:id", authMiddleware, BusinessController.updateBusiness);
router.get("/:id", authMiddleware, BusinessController.getBusinessById);
router.delete("/:id", authMiddleware, BusinessController.deleteBusiness);
router.post("/:id/subscribe", authMiddleware, BusinessController.subscribeToBusiness);
router.delete("/:id/unsubscribe", authMiddleware, BusinessController.unsubscribeFromBusiness);
router.post("/:id/review", authMiddleware, BusinessController.addReview);
router.get("/:id/reviews", BusinessController.getReviews);
router.delete("/:id/review/:reviewId", adminMiddleware, BusinessController.deleteReview);

export default router;
