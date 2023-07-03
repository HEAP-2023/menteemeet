const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Group = sequelize.define(
    "Group",
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
      tableName: 'group'
    }
);

module.exports = Group;