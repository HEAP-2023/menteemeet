const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserProgramme = sequelize.define(
    "UserProgramme",
    {
      user_prog_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
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