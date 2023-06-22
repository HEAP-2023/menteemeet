const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organiser = sequelize.define(
    "Organiser",
    {
        ORG_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        DESCRIPTION: {
            type: DataTypes.String(),
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: "organiser"
    }
);

module.exports = Organiser;