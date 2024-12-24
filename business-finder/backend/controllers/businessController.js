const Business = require("../models/business");
const User = require("../models/user");

// Get all businesses with optional filters (name and category)
const getBusinesses = async (req, res) => {
	try {
		const { name, category } = req.query;
		const filter = {};

		if (name) filter.name = { $regex: name, $options: "i" };
		if (category) filter.category = category;

		const businesses = await Business.find(filter).populate("owner", "name email");
		res.status(200).json(businesses);
	} catch (err) {
		res.status(500).send("Error fetching businesses");
	}
};

// Create a new business (Owner must be authenticated)
const createBusiness = async (req, res) => {
	const { name, description, category } = req.body;

	try {
		const user = await User.findById(req.user.id);
		const maxBusinesses = user.plan === "Platinum" ? 10 : user.plan === "Gold" ? 3 : 1;

		const businessesCount = await Business.countDocuments({ owner: req.user.id });
		if (businessesCount >= maxBusinesses) {
			return res.status(400).send("Business limit reached. Upgrade your plan.");
		}

		const business = new Business({
			name,
			description,
			category,
			owner: req.user.id,
		});

		await business.save();
		res.status(201).json(business);
	} catch (err) {
		res.status(500).send("Error creating business");
	}
};

// Update a business (Owner must be authenticated)
const updateBusiness = async (req, res) => {
	const { name, description, category } = req.body;

	try {
		const business = await Business.findById(req.params.id);
		if (!business) return res.status(404).send("Business not found");

		if (business.owner.toString() !== req.user.id) {
			return res.status(403).send("You are not the owner of this business");
		}

		business.name = name || business.name;
		business.description = description || business.description;
		business.category = category || business.category;

		await business.save();
		res.status(200).json(business);
	} catch (err) {
		res.status(500).send("Error updating business");
	}
};

// Delete a business (Owner must be authenticated)
const deleteBusiness = async (req, res) => {
	try {
		const business = await Business.findById(req.params.id);
		if (!business) return res.status(404).send("Business not found");

		if (business.owner.toString() !== req.user.id) {
			return res.status(403).send("You are not the owner of this business");
		}

		await business.remove();
		res.status(200).send("Business deleted successfully");
	} catch (err) {
		res.status(500).send("Error deleting business");
	}
};

// Subscribe to a business (Authenticated users)
const subscribeToBusiness = async (req, res) => {
	const businessId = req.params.id;
	try {
		const business = await Business.findById(businessId);
		if (!business) return res.status(404).send("Business not found");

		if (business.subscribers.includes(req.user.id)) {
			return res.status(400).send("Already subscribed");
		}

		business.subscribers.push(req.user.id);
		await business.save();
		res.status(200).send("Subscribed successfully");
	} catch (err) {
		res.status(500).send("Error subscribing to business");
	}
};

// Unsubscribe from a business (Authenticated users)
const unsubscribeFromBusiness = async (req, res) => {
	const businessId = req.params.id;
	try {
		const business = await Business.findById(businessId);
		if (!business) return res.status(404).send("Business not found");

		business.subscribers = business.subscribers.filter(
			(subscriberId) => subscriberId.toString() !== req.user.id
		);
		await business.save();
		res.status(200).send("Unsubscribed successfully");
	} catch (err) {
		res.status(500).send("Error unsubscribing from business");
	}
};

// Add a review to a business (Authenticated users)
const addReview = async (req, res) => {
	const businessId = req.params.id;
	const { comment } = req.body;

	try {
		const business = await Business.findById(businessId);
		if (!business) return res.status(404).send("Business not found");

		business.reviews.push({
			userId: req.user.id,
			comment,
		});

		await business.save();
		res.status(200).send("Review added successfully");
	} catch (err) {
		res.status(500).send("Error adding review");
	}
};

// Get all reviews for a business
const getReviews = async (req, res) => {
	const businessId = req.params.id;
	try {
		const business = await Business.findById(businessId).populate("reviews.userId", "name email");
		if (!business) return res.status(404).send("Business not found");

		res.status(200).json(business.reviews);
	} catch (err) {
		res.status(500).send("Error fetching reviews");
	}
};

// Admin: Delete a review (Admin only)
const deleteReview = async (req, res) => {
	const { id, reviewId } = req.params;
	try {
		const business = await Business.findById(id);
		if (!business) return res.status(404).send("Business not found");

		const reviewIndex = business.reviews.findIndex((review) => review._id.toString() === reviewId);
		if (reviewIndex === -1) return res.status(404).send("Review not found");

		business.reviews.splice(reviewIndex, 1);
		await business.save();
		res.status(200).send("Review deleted successfully");
	} catch (err) {
		res.status(500).send("Error deleting review");
	}
};

module.exports = {
	getBusinesses,
	createBusiness,
	updateBusiness,
	deleteBusiness,
	subscribeToBusiness,
	unsubscribeFromBusiness,
	addReview,
	getReviews,
	deleteReview,
};
