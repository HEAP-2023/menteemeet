const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Programme = sequelize.define(
    "Programme",
    {
        programme_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        programmeStart: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        programmeEnd: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        mentorCapacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        menteeCapacity: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        category: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        deadline: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        matching_criteria: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        skills: {
          type: DataTypes.STRING(),
          allowNull: true
        },
        display_image: {
            type: DataTypes.STRING(),
            allowNull: true,
        }
    },
    {
      timestamps: false,
      tableName: "programme"
    }
);

module.exports = Programme;