const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Application = sequelize.define(
    "Application",
    {
        application_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        availability: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        skills: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        interests: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        is_accepted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
    },
    {
      timestamps: false,
      tableName: 'application'
    }
);

module.exports = Application;