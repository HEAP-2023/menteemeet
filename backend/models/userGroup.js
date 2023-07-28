const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const userGroup = sequelize.define(
    "userGroup",
    {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        group_no: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: 'usergroup'
    }
);

module.exports = userGroup;