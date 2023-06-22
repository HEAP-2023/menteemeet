const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserSkill = sequelize.define(
    "UserSkill",
    {},
    {
      timestamps: false,
      tableName: "user_skill"
    }
);

module.exports = UserSkill;