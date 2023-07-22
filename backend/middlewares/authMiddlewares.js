const jwt = require("jsonwebtoken");
const config = require('../utils/config');
const jwtDecode = require("jwt-decode");

//Request Access to DB
const Account = require("../models/account");

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    //if got authHeader then return (v) this. while splitting space
    //token var will either be undefined (first part)
        // or the actual token after &&
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(400).json({ error: "No JWT provided!" });

    // decode jwt
    const getPayload = jwtDecode(token);

    //find a particular user for JWT Token.
    const getAcc = await Account.findOne(
        {   where: { account_id: getPayload.account_id }, raw: true} )

    if (!getAcc) {
      return res.status(400).json({ message: "Invalid JWT!" });
    }
    
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, account) => {

        if (getPayload.jti !== getAcc.json_tokenID || err) {
            return res.status(403).json({ error: "Invalid JWT!" });
        }
    
        req.account = account;
        next();
    })
    // Bearer TOKEN
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Failed to verify JWT token!" });
  } 
}

module.exports = { authenticateToken };
