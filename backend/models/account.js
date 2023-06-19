const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "Account",
    {
        ACCOUNT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        FIRST_NAME: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        LAST_NAME: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        EMAIL: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        PASSWORD: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        CONTACT_NO: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ADDRESS: {
            type: DataTypes.STRING(),
            allowNull: true
        },
    },
    {
      timestamps: false,
      tableName: "account"
    }
)

module.exports = Account