const guestMiddleware = (req, res, next) => {
    if (req.user && req.user.plan === "Guest") {
        return res.status(403).send("Guests do not have access to this resource.");
    }
    next();
};

module.exports = guestMiddleware;
