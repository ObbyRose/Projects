import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	res.cookie("jwt", token, {
		httpOnly: true,
		maxAge: 10 * 60 * 1000,
		sameSite: "strict",
	});

	return token;
};

export default generateTokenAndSetCookie;