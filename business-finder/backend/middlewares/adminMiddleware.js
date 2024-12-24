const User = require("../schema/userSchema.js");

const adminMiddleware = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);

		if (!user) {
			return res.status(404).send("User not found");
		}

		if (user.role !== "admin") {
			return res.status(403).send("Access denied: Admins only");
		}
		next();
	} catch (err) {
		res.status(500).send("Error checking admin privileges");
	}
};

module.exports = adminMiddleware;
