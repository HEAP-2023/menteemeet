
///// -------------------  W I P -----------------   ////////

const User = require("../models/account");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// const EXPIRY = process.env.EXPIRY;

const registerAcc = async (req, res) => {

    const {firstname, lastname, email, password } = req.body;
    try {
        // WHERE Email : has "email"
        if (await User.findOne({where: { EMAIL: email } })) {
            return res.status(400).json({ message: "Email address has already been taken!"});
        }

        //create salt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create entry 
        const newUser = await User.create({
            FIRST_NAME: firstname,
            LAST_NAME: lastname,
            EMAIL: email,
            PASSWORD: hashedPassword,
        })
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }
}

const loginAcc = async (req, res) => {

    const { email, password } = req.body;

    try {

        // if incorrect, X
        const user = await User.findOne( {where: { EMAIL: email } });

        if (!user) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }
        // email valid -> Compare password with bcrypt
        if (!(await bcrypt.compare(password, user.PASSWORD))) {
            return res.status(401).json( { message: "Your email/password is incorrect." });
        }

        return res.status(302).json( {message: "You have been successfully logged in"});
        //  return res.status(302).json( {jwt: token });
        
    } catch (err) {
        return res.status(500).json( { error: err });
    }
}

module.exports = {registerAcc, loginAcc}


