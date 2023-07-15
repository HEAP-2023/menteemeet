const Account = require("../models/account");
const User = require('../models/user');

const Organiser = require('../models/organiser');
const bcrypt = require("bcrypt");
const config = require('../utils/config');
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require('uuid');

// Generate JWT ID 
function generateJwtId() {
  const jti = Buffer.from(uuidv4().replace(/-/g, ''), 'hex').toString('base64').replace(/=+$/, '');
  return jti;
}

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const EXPIRY = config.EXPIRY;

const register = async (req, res) => {
  const { name, email, password, confirmPassword, account_type } = req.body;
  try {
    // WHERE Email : has "email"
    if (await Account.findOne({ where: { email: email } })) {
      return res.status(400).json({ message: "Email address has already been taken!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords dont match!"});
    }

    //create salt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create entry 
    const newAccount = await Account.create({
      name: name,
      email: email,
      password: hashedPassword,
      account_type: account_type
    })

    const accessToken = generateAccessToken(newAccount.dataValues);

    if (account_type === 'user') {
      const newUser = await User.create({
        account_id: newAccount.account_id,
      })
      return res.status(201).json({ ...newAccount.dataValues, user_id: newUser.user_id, accessToken });

    } else if (account_type === 'organiser') {
      const newOrganiser = await Organiser.create({
        account_id: newAccount.dataValues.account_id,
      })
      return res.status(201).json({ ...newAccount.dataValues, organiser_id: newOrganiser.organiser_id , accessToken });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

const generateAccessToken = (account) => {

  const jwtID = generateJwtId();

  // Remove the encoded password property
  delete account.password;
  const tokenSigned = jwt.sign(account, ACCESS_TOKEN_SECRET, { jwtid: jwtID, expiresIn: EXPIRY });

  //store into DB
  // if (account.account_type === 'user'){
    Account.update(
      { json_tokenID: jwtID }, 
      { where: { account_id: account.account_id }} )
  // } else {
    // Organiser.update(
    //   { json_tokenID: jwtID }, 
    //   { where: { account_id: account.account_id }})
  // }

  return tokenSigned;
}

const login = async (req, res) => {

  //Authenticate user
  const { email, password } = req.body;

  try {
    // if incorrect, DB col : form col
    const user = await Account.findOne({ where: { email: email }, raw: true });

    if (!user) {
      return res.status(401).json({ message: "Your email/password is incorrect." });
    }
    // email valid -> Compare password with bcrypt
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Your email/password is incorrect." });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      message: "Successfully logged in!", accessToken, user
    }); 

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

module.exports = { register, login, generateAccessToken };