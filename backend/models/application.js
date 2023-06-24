const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Application = sequelize.define(
    "Application",
    {
        APPLICATION_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        DATE: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        FORM_DETAILS: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        ISACCEPTED: {
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