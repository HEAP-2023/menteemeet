const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organiser = sequelize.define(
    "Organiser",
    {
        organiser_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING(),
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: "organiser"
    }
);

module.exports = Organiser;