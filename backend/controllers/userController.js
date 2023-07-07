const Account = require("../models/account");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const config = require('../utils/config');
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;

const EXPIRY = config.EXPIRY;

// const registerUser = async (req, res) => {

//     const { firstname, lastname, email, password, account_type } = req.body;
//     try {
//         // WHERE Email : has "email"
//         if (await Account.findOne({ where: { EMAIL: email } })) {
//             return res.status(400).json({ message: "Email address has already been taken!"});
//         }

//         //create salt
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);

//         //Create entry 
//         const newAccount = await Account.create({
//             first_name: firstname,
//             last_name: lastname,
//             email: email,
//             password: hashedPassword,
//             account_type: account_type
//         })

//         const newUser = await User.create({
//             account_id: newAccount.dataValues.account_id,
//         })

//         res.status(201).json({ ...newAccount.dataValues, user_id: newUser.user_id });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ error: err });
//     }
// }

// //Still fixing this
// let refreshTokens = []
// //for refresh token
// const refreshTokFunc = async (req, res) => {
//     const refreshToken = req.body.token
//     if (refreshToken == null) return res.status(401).json({ message: "Token is empty"});
//     if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: "Token is invalid" });

//     jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403).json( {message: "Error. JWT issue" }, { error: err });

//         console.log(typeof user);
//         console.log("Test : " +  user);
//         const accessToken = generateAccessToken(user)

//         res.json({ accessToken : accessToken })
//     })
// }

// var storeUserObj;
// const loginUser = async (req, res) => {

//     //Authenticate user
//     const { email, password } = req.body;

//     try {
//         // if incorrect, DB col : form col
//         const user = await Account.findOne( {where: { email: email } });

//         if (!user) {
//             return res.status(401).json( { message: "Your email/password is incorrect." });
//         }
//         // email valid -> Compare password with bcrypt
//         if (!(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json( { message: "Your email/password is incorrect." });
//         }
//         //this is for update func
//         storeUserObj = user.toJSON();

//         const accessToken = generateAccessToken(user);
//         // no expiry
//         const refreshToken = jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET);
//         refreshTokens.push(refreshToken);

//         return res.status(200).json({message: "Successfully logged in!", accessToken: accessToken, 
//         refreshToken: refreshToken });
        
//     } catch (err) {
//         console.log(err);   
//         return res.status(500).json( { error: err });
//     }
// }

// function generateAccessToken(user) {

//     if (typeof user === 'object') {
//         return jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY });
//     } else {
//         return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: EXPIRY });
//     }
// }

const updateUser = async (req, res) => {
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

const getUser = async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findOne({ where: { user_id: id }, raw: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found!'})
      }

      const account = await Account.findOne({ where: { account_id: user.account_id }, raw: true});

      return res.status(200).json({ ...account, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
}

module.exports = { updateUser, getUser };