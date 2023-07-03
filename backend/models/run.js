const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Run = sequelize.define(
    "Run",
    {
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        attendance: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        }
        
    },
    {
      timestamps: false,
      tableName: "run"
    }
);

module.exports = Run;