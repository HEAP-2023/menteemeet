const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    //if got authHeader then return (v) this. while splitting space
    //token var will either be undefined (first part)
        // or the actual token after &&
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).json({ error: "No JWT provided!" });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.status(403).json({ error: "Invalid JWT!" });

        req.user = user
        next()
    })
    // Bearer TOKEN 
}

module.exports = { authenticateToken };
