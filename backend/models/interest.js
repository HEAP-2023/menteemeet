const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Interest = sequelize.define(
    "Interest",
    {
        INTEREST_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        INTEREST: {
          type: DataTypes.STRING(),
          allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'interests'
    }
);

module.exports = Interest;