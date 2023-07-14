const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Account = sequelize.define(
    "Account",
    {
        account_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(),
            allowNull: false
        },
        contact_no: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        account_type: {
            type: DataTypes.STRING(),
            allowNULL: false
        }
    },
    {
      timestamps: false,
      tableName: "account"
    }
);

module.exports = Account;