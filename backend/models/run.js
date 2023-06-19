const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Run = sequelize.define(
    "Run",
    {
        STARTDATE: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ENDDATE: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ATTENDANCE: {
            type: DataTypes.INTEGER(),
            allowNull: false;
        }
        
    },
    {
      timestamps: false,
      tableName: "run"
    }
)

module.exports = Run