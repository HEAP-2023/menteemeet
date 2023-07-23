const Account = require("../models/account");
const User = require('../models/user');
const Organiser = require('../models/organiser');
const bcrypt = require("bcrypt");
const config = require('../utils/config');
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require('uuid');

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const EXPIRY = config.EXPIRY;

// Generate JWT ID 
function generateJwtId() {
  const jti = Buffer.from(uuidv4().replace(/-/g, ''), 'hex').toString('base64').replace(/=+$/, '');
  return jti;
}

const generateAccessToken = async (account) => {

  const jwtID = generateJwtId();

  //Handle updating to DB before signing. 
  //store into DB
  await Account.update(
    { json_tokenID: jwtID },
    { where: { account_id: account.account_id }} )

  const updatedAcc = await Account.findOne({ where: { account_id: account.account_id }, raw: true });

  // Remove the encoded password property
  delete updatedAcc.password;
  const tokenSigned = jwt.sign(updatedAcc, ACCESS_TOKEN_SECRET, { jwtid: jwtID, expiresIn: EXPIRY });

  return tokenSigned;
}

function resetJWT(getAccID) {
  //to set JTI empty.
    Account.update(
    {   json_tokenID: "placeholder" }, 
    {   where: { account_id : getAccID }} )
}

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

    const accessToken = await generateAccessToken(newAccount.dataValues);

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

const login = async (req, res) => {

  //Authenticate user
  const { email, password } = req.body;

  try {
    // if incorrect, DB col : form col
    const account = await Account.findOne({ where: { email: email }, raw: true });

    if (!account) {
      return res.status(401).json({ message: "Your email/password is incorrect." });
    }

    // email valid -> Compare password with bcrypt
    if (!(await bcrypt.compare(password, account.password))) {
      return res.status(401).json({ message: "Your email/password is incorrect." });
    }

    const accessToken = await generateAccessToken(account);

    if (account.account_type === 'user'){
      const user = await User.findOne({ where: { account_id: account.account_id }, raw: true });
      return res.status(200).json({
        message: "Successfully logged in!", accessToken, account, user
      });
    } else {
      const organiser = await Organiser.findOne({ where: { account_id: account.account_id }});
      return res.status(200).json({
        message: "Successfully logged in!", accessToken, account, organiser
      });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
}

const changePassword = async (req, res) => {
  const acct = req.account;
  const { currentPW, newPW, confirmNewPW } = req.body;

  if (!newPW || newPW == "") {
    return res.status(400).json({ message: "New password cannot be empty!" })
  }

  const account = await Account.findOne({ where: { account_id: acct.account_id }, raw: true });

  // Check current password
  if (!(await bcrypt.compare(currentPW, account.password))) {
    return res.status(401).json({ message: "Current password is incorrect." });
  }

  if (newPW !== confirmNewPW) {
    return res.status(400).json({ message: "Passwords don't match!" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(newPW, salt);

    await Account.update(
      { password: hashedPass }, 
      { where: { account_id: account.account_id }})

    return res.status(200).json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to change password!" });
  }
}

const logout = async (req, res) => {
  const account = req.account
  try {
    resetJWT(account.account_id);
    return res.status(200).json({ message: "Successfully logged out!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

module.exports = { register, login, changePassword, logout, generateAccessToken, resetJWT };