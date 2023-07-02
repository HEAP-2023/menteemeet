const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Programme = sequelize.define(
    "Programme",
    {
        programme_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        matching_criteria: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        external_link: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        media: {
            type: DataTypes.BLOB(),
            allowNull: true,
        },
        application_deadline: {
            type: DataTypes.DATE,
            allowNull: false,
        }

    },
    {
      timestamps: false,
      tableName: "programme"
    }
);

module.exports = Programme;