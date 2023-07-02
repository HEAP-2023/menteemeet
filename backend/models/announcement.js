const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Announcement = sequelize.define(
    "Announcement",
    {
        ANNOUNCEMENT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        MESSAGE: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        TYPE: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'announcement'
    }
);

module.exports = Announcement;