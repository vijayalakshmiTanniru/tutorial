exports.logout = (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 0 }); // Clear the cookie
    res.json({ message: "Logged out successfully" }); //access to protected routes removed upon logout [cite: 3]
};
