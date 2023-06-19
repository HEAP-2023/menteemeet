const { Sequelize } = require("sequelize");

host = process.env.MYSQL_HOST;
database = process.env.MYSQL_DATABASE;
user = process.env.MYSQL_USER;
password = process.env.MYSQL_PASSWORD;

//Setting up connection to DB
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql'
});

module.exports = sequelize;