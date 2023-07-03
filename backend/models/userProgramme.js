const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProgramme = sequelize.define(
    "UserProgramme",
    {
      role: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "userProgramme"
    }
);

module.exports = UserProgramme;