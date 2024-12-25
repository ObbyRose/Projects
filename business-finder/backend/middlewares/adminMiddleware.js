import User from "../schema/userSchema.js";
import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		const user = await User.findById(req.user.userId);

		if (!user) {
			return res.status(404).send("User not found");
		}

		if (user.role !== "admin") {
			console.log(user.role);
			
			return res.status(403).send("Access denied: Admins only");
		}
		next();
	} catch (err) {
		res.status(500).send("Error checking admin privileges");
	}
};

export default adminMiddleware;
