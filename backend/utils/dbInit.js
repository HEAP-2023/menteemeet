const Account = require("../models/account");

const data = [
   { FIRST_NAME: "Jack", LAST_NAME: "Tan", EMAIL: "jack@live.com"},
]

const seedData = () => Account.bulkCreate(data)
    .then(() => {
        console.log("Seeded Account Data Successfully.");
    })
    .catch(err => {
        console.log("Error seeding Account Data:", err);
    })

module.exports = seedData;