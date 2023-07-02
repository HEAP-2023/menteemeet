const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Resource = sequelize.define(
    "Resource",
    {
        resource_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        media: {
          type: DataTypes.BLOB(),
          allowNull: true,
        },
        message: {
            type: DataTypes.STRING(),
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'resource'
    }
);

module.exports = Resource;