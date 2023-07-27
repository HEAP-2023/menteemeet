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
        // name: {
        //   type: DataTypes.STRING(),
        //   allowNull: false,
        // },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        availability: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        skills: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        interests: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING(),
          allowNull: false,
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