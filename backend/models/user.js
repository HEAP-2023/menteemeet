const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        USER_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        SPECIALISATION: {
            type: DataTypes.STRING(),
            allowNull: true
        },
        INTEREST_AREAS: {
            type: DataTypes.STRING(),
            allowNull: true
        },
    },
    {
      timestamps: false,
      tableName: "user"
    }
)

module.exports = User