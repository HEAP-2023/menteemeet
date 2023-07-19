const Account = require("../models/account");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const data =
   { name: "Jack Tan", email: "jack@live.com", account_type: "user" }

const seedData = async () => {
  try {
    data.password = await generateHashedPassword('Tester123');
    const newAccount = await Account.create(data, { raw: true });
    
    const user = { account_id: newAccount.account_id };
    const newUser = await User.create(user);

    console.log("Successfully seeded user " + data.name);
  } catch(err) {
    console.error("Failed to seed user. Error: ", err);
  }
}

module.exports = seedData;