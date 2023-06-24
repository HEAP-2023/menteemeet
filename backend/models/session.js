const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SESSION = sequelize.define(
    "SESSION",
    {
        SESSION_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        DATE: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        START_TIME: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        END_TIME: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        TOPIC: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'comment'
    }
);

module.exports = Comment;