const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'YOUR_JWT_SECRET', { // Replace with your secret
            expiresIn: '1h'
        });

        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Store JWT in cookie [cite: 3]
        res.json({ message: "Logged in successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
