const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserSkill = sequelize.define(
    "UserSkill",
    {},
    {
      timestamps: false,
      tableName: "userSkill"
    }
);

module.exports = UserSkill;