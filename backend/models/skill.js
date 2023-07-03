const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Skill = sequelize.define(
    "Skill",
    {
        skill_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        skill: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING(),
          allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: 'skill'
    }
);

module.exports = Skill;