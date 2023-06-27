const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProgramme = sequelize.define(
    "UserProgramme",
    {
      ROLE: {
          type: DataTypes.STRING,
          allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "user_programme"
    }
);

module.exports = UserProgramme;