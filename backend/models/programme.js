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
        category: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matching_criteria: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        application_deadline: {
          type: DataTypes.DATE,
          allowNull: false,
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