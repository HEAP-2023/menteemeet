const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Skill = sequelize.define(
    "Skill",
    {
        SKILL_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        SKILL: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        CATEGORY: {
          type: DataTypes.STRING(),
          allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: 'skills'
    }
);

module.exports = Skill;