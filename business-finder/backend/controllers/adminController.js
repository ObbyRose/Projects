const User = require("../schema/userSchema");
const Business = require("../schema/businessSchema");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).send("Error fetching users");
	}
};

// Delete a user (admin only)
const deleteUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}
		await user.remove();
		res.status(200).send("User deleted successfully");
	} catch (err) {
		res.status(500).send("Error deleting user");
	}
};

const getAllBusinesses = async (req, res) => {
	try {
		const businesses = await Business.find().populate("owner", "name email");
		res.status(200).json(businesses);
	} catch (err) {
		res.status(500).send("Error fetching businesses");
	}
};

// Delete a business (admin only)
const deleteBusiness = async (req, res) => {
	const businessId = req.params.id;

	try {
		const business = await Business.findById(businessId);
		if (!business) {
			return res.status(404).send("Business not found");
		}
		await business.remove();
		res.status(200).send("Business deleted successfully");
	} catch (err) {
		res.status(500).send("Error deleting business");
	}
};

// Moderate reviews (admin only)
const moderateReview = async (req, res) => {
	const { businessId, reviewId, action } = req.body;  // action can be 'approve' or 'reject'

	try {
		const business = await Business.findById(businessId);
		if (!business) {
			return res.status(404).send("Business not found");
		}

		const review = business.reviews.id(reviewId);
		if (!review) {
			return res.status(404).send("Review not found");
		}

		if (action === "approve") {
			review.status = "approved"; 
		} else if (action === "reject") {
			review.status = "rejected";
		} else {
			return res.status(400).send("Invalid action. Use 'approve' or 'reject'");
		}

		await business.save();
		res.status(200).send("Review moderated successfully");
	} catch (err) {
		res.status(500).send("Error moderating review");
	}
};

module.exports = {
	getAllUsers,
	deleteUser,
	getAllBusinesses,
	deleteBusiness,
	moderateReview,
};
