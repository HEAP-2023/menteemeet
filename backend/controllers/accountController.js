const Account = require("../models/account");
const User = require('../models/user');
const Organiser = require('../models/organiser');
const bcrypt = require("bcrypt");
const config = require('../utils/config');
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const EXPIRY = config.EXPIRY;

const generateAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY });
}

const register = async (req, res) => {
    const { name, email, password, account_type } = req.body;
    try {
        // WHERE Email : has "email"
        if (await Account.findOne({ where: { email: email } })) {
            return res.status(400).json({ message: "Email address has already been taken!"});
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
        }, { raw: true })

        if (account_type === 'user') {
          const newUser = await User.create({
            account_id: newAccount.account_id,
          }, { raw: true })
          return res.status(201).json({ ...newAccount, user_id: newUser.user_id });
        } else if (account_type === 'organiser') {
          const newOrganiser = await Organiser.create({
            account_id: newAccount.dataValues.account_id,
          }, { raw: true })
          return res.status(201).json({ ...newAccount, organiser_id: newOrganiser.organiser_id });
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
        const user = await Account.findOne({ where: { email: email }, raw: true });

        if (!user) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }
        // email valid -> Compare password with bcrypt
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }

        const accessToken = generateAccessToken(user);

        return res.status(200).json({ message: "Successfully logged in!", accessToken: accessToken, 
        user });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json( { error: err });
    }
}

module.exports = { register, login };