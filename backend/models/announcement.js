const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Announcement = sequelize.define(
    "Announcement",
    {
        announcement_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        message: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        type: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: 'announcement'
    }
);

module.exports = Announcement;