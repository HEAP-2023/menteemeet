
///// -------------------  W I P -----------------   ////////

const User = require("../models/account");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const EXPIRY = process.env.EXPIRY;

const registerAcc = async (req, res) => {

    const { firstname, lastname, email, password } = req.body;
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

    //Authenticate user
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

        const accessToken = jwt.sign(user.toJSON(), ACCESS_TOKEN_SECRET)

        // return res.status(200).json({ message: "Successfully logged in!" });
        // return res.status(200).json({ accessToken: accessToken });

        
        
    } catch (err) {
        return res.status(500).json( { error: err });
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']

    //if got authHeader then return (v) this. while splitting space
    //token var will either be undefined (first part)
        // or the actual token after &&
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)

        req.user = user
        next()
    })
    // Bearer TOKEN 
}

module.exports = {registerAcc, loginAcc}


