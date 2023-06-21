const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Programme = sequelize.define(
    "Programme",
    {
        PROGRAMME_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        NAME: {
            type: DataTypes.String(50),
            allowNull: false,
        },
        DESCRIPTION: {
            type: DataTypes.String(),
            allowNull: true,
        },
        CATEGORY: {
            type: DataTypes.String(30),
            allowNull: true,
        },
        CAPACITY: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        MATCHING_CRITERIA: {
            type: DataTypes.String(),
            allowNull: false,
        },
        EXTERNAL_LINK: {
            type: DataTypes.String(),
            allowNull: true,
        },
        MEDIA: {
            type: DataTypes.BLOB(),
            allowNull: true,
        },
        APPLICATION_DATELINE: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    },
    {
      timestamps: false,
      tableName: "programme"
    }
);

module.exports = Programme;