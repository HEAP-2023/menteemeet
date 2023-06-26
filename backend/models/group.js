const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Group = sequelize.define(
    "Group",
    {
        GROUP_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        GROUP_NO: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    },
    {
      timestamps: false,
      tableName: 'group'
    }
);

module.exports = Group;