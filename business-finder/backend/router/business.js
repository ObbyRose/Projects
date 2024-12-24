const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const BusinessController = require("../controllers/businessController");

router.get("/", BusinessController.getBusinesses);
router.post("/", authMiddleware, BusinessController.createBusiness);
router.put("/:id", authMiddleware, BusinessController.updateBusiness);
router.delete("/:id", authMiddleware, BusinessController.deleteBusiness);
router.post("/:id/subscribe", authMiddleware, BusinessController.subscribeToBusiness);
router.delete("/:id/unsubscribe", authMiddleware, BusinessController.unsubscribeFromBusiness);
router.post("/:id/review", authMiddleware, BusinessController.addReview);
router.get("/:id/reviews", BusinessController.getReviews);
router.delete("/:id/review/:reviewId", adminMiddleware, BusinessController.deleteReview);

module.exports = router;
