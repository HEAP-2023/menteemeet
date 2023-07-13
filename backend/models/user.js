const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        telegram_username: {
            type: DataTypes.STRING(),
            allowNull: true
        },
        json_tokenID: {
            type:DataTypes.STRING(),
            allowNULL: true
        }
    },
    {
      timestamps: false,
      tableName: "user"
    }
);

module.exports = User;