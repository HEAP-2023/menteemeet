const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const userGroup = sequelize.define(
    "userGroup",
    {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        group_no: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mentees: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        mentors: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        common_dt: {
          type: DataTypes.STRING(),
          allowNull: true,
        },
        programme_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    },
    {
      timestamps: false,
      tableName: 'usergroup'
    }
);

module.exports = userGroup;