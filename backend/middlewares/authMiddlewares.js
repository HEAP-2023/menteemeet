const jwt = require("jsonwebtoken");
const config = require('../utils/config');
const jwtDecode = require("jwt-decode");

//Request Access to DB
const User = require("../models/user");

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    //if got authHeader then return (v) this. while splitting space
    //token var will either be undefined (first part)
        // or the actual token after &&
    const token = authHeader && authHeader.split(' ')[1];

    // decode jwt
    const getPayload = jwtDecode(token);

    //find a particular user for JWT Token.
    const getUser = await User.findOne(
        {   where: { user_id: getPayload.account_id }} )

    if (token == null) return res.status(400).json({ error: "No JWT provided!" });

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {

        if (getPayload.jti !== getUser.json_tokenID || err) {
            return res.status(403).json({ error: "Invalid JWT! Please RE-LOGIN if you recently changed your password" });
        }
    
        req.user = user;
        next();

    })
    // Bearer TOKEN 
}

module.exports = { authenticateToken };
