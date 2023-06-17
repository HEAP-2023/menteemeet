const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Organisation = sequelize.define(
    "Organisation",
    {
        ORG_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        DECSRIPTION: {
            type: DataTypes.String(),
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: "organisation"
    }
)

module.exports = Organisation