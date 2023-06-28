require('dotenv').config({ path: "../.env" });

const PORT = process.env.PORT;
const API_VER = process.env.API_VER;

const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_ROOT_PASSWORD = process.env.MYSQL_ROOT_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const EXPIRY = process.env.EXPIRY

module.exports = {
  PORT, API_VER, MYSQL_HOST, MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, ACCESS_TOKEN_SECRET, EXPIRY
};