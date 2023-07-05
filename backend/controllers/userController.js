const Account = require("../models/account");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const config = require('../utils/config');
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const EXPIRY = config.EXPIRY;

const registerAcc = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
    try {
        // WHERE Email : has "email"
        if (await Account.findOne({ where: { EMAIL: email } })) {
            return res.status(400).json({ message: "Email address has already been taken!"});
        }

        //create salt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create entry 
        const newAccount = await Account.create({
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: hashedPassword,
        })

        const newUser = await User.create({
            account_id: newAccount.dataValues.account_id,
        })

        res.status(201).json({ ...newAccount.dataValues, user_id: newUser.user_id });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

var storeUserObj;
const loginAcc = async (req, res) => {

    //Authenticate user
    const { email, password } = req.body;

    try {
        // if incorrect, DB col : form col
        const user = await Account.findOne( {where: { email: email } });

        if (!user) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }
        // email valid -> Compare password with bcrypt
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }
        //this is for update func
        storeUserObj = user.toJSON();

        const accessToken = generateAccessToken(user);

        return res.status(200).json({message: "Successfully logged in!", accessToken: accessToken });
        
    } catch (err) {
        console.log(err);
        return res.status(500).json( { error: err });
    }
}

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY });
}

const updateAcc = async (req, res) => {

    try {
        //Filtering out each Object so that they == to the email.
        //req.user.email == JWT's Email
        // const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => value === req.user.email));
        // const filteredJsonString = JSON.stringify(filteredObject); // Stringify the filtered object

        //to get AccountID from the login data
        const filteredObject = Object.fromEntries(Object.entries(storeUserObj).filter(([key, value]) => key === "account_id"));
        const getCurrID = filteredObject.account_id;

        const email = req.body.email;

        //Update function
        if (await Account.update(
            {   email: email }, 
            {   where: { account_id: getCurrID }} )) {
        };
        
        return res.status(200).json({message: "Login as : " + email + ". Successfully Authenticated & Updated!" });
        
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

module.exports = { registerAcc, loginAcc, updateAcc };