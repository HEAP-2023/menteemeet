const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Grouping = sequelize.define(
    "Grouping",
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
      tableName: 'grouping'
    }
);

module.exports = Grouping;