const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Interest = sequelize.define(
    "Interest",
    {
        interest_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        interest: {
          type: DataTypes.STRING(),
          allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'interest'
    }
);

module.exports = Interest;