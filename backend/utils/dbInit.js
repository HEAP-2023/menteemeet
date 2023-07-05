const Account = require("../models/account");
const bcrypt = require("bcrypt");

const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

const data = [
   { first_name: "Jack", last_name: "Tan", email: "jack@live.com", account_type: "user" },
]

const seedData = async () => {
  data[0].password = await generateHashedPassword('Tester123');
  Account.bulkCreate(data)
    .then(() => {
        console.log("Seeded Account Data Successfully.");
    })
    .catch(err => {
        console.log("Error seeding Account Data:", err);
    })
}

module.exports = seedData;