const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Resource = sequelize.define(
    "Resource",
    {
        RESOURCE_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        MEDIA: {
          type: DataTypes.BLOB(),
          allowNull: true,
        },
        MESSAGE: {
            type: DataTypes.String(),
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'resource'
    }
);

module.exports = Resource;