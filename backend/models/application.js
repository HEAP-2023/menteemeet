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
            type: DataTypes.DATE,
            allowNull: false,
        },
        form_details: {
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