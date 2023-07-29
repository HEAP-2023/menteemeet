const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Session = sequelize.define(
    "Session",
    {
        session_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        topic: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'session'
    }
);

module.exports = Session;