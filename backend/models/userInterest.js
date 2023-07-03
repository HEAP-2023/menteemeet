const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserInterest = sequelize.define(
    "UserInterest",
    {},
    {
      timestamps: false,
      tableName: "userInterest"
    }
);

module.exports = UserInterest;