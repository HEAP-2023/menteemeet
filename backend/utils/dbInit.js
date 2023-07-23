const Account = require("../models/account");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require('../controllers/accountController');

const Skill = require("../models/skill");
const Interest = require("../models/interest");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const data =
  { name: "Jack Tan", email: "jack@gmail.com", account_type: "user" }

const skillData = [
  { skill: "C", category: "Programming" },
  { skill: "Java", category: "Programming" },
  { skill: "Python", category: "Programming" },
  { skill: "JavaScript", category: "Programming" },
  { skill: "Discrete Math", category: "Math" },
  { skill: "Linear Algebra", category: "Math" },
  { skill: "Statistics", category: "Math" },
  { skill: "English", category: "Language" },
  { skill: "Chinese", category: "Language" },
  { skill: "Japanese", category: "Language" }
];

const interestData = [
  { interest: "Programming" },
  { interest: "Math" },
  { interest: "Language" }
];

const seedData = async () => {
  try {
    data.password = await generateHashedPassword('Tester123');
    const newAccount = await Account.create(data, { raw: true });
    
    const user = { account_id: newAccount.account_id };
    const newUser = await User.create(user);

    //To add Skill into DB
    await Skill.bulkCreate(skillData, { raw: true });

    //To add interest into DB
    await Interest.bulkCreate(interestData, { raw: true});

    // console.log("Successfully seeded user " + data.name);
    console.log("[SYSTEM] Successfully seeded all data.")
  } catch(err) {
    console.error("[SYSTEM] Failed to seed user. Error: ", err);
  }
}

module.exports = seedData;