
///// -------------------  W I P -----------------   ////////

// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const EXPIRY = process.env.EXPIRY;

const registerUser = async (req, res) => {

    const { email, password, role } = req.body;
    try {
        // WHERE - column name Email : has this (email address)
        if (await User.findOne({where: { EMAIL: email } })) {
            return res.status(400).json({ message: "Email address has already been taken!"});
        }

        //create salt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create an entry in the database.
        const newUser = await User.create({
            EMAIL: email,
            PASSWORD: hashedPassword,
            ROLE: role
        })
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        // if email is incorrect, do not proceed
        const user = await User.findOne( {where: { EMAIL: email } });

        if (!user) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }
        // email valid -> Compare password, using bcrypt compare
        if (!(await bcrypt.compare(password, user.PASSWORD))) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }
        
    } catch (err) {
        return res.status(500).json( { error: err });
    }
}

module.exports = {registerUser, loginUser}

