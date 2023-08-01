const { Sequelize } = require("sequelize");
const config = require('../utils/config');

host = config.MYSQL_HOST;
database = config.MYSQL_DATABASE;
user = config.MYSQL_USER;
password = config.MYSQL_PASSWORD;

//Setting up connection to DB
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    //Force Sequelize to store and retrieve as GMT+8
    timezone: '+08:00',
});

module.exports = sequelize;