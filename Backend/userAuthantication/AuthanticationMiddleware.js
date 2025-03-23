const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Authentication required" }); // [cite: 4]
        }

        const decoded = jwt.verify(token, 'YOUR_JWT_SECRET'); // Replace with your secret
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
