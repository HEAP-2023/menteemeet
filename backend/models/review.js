const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define(
    "Review",
    {
        REVIEW_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        DATE: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        RATING: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        COMMENT: {
            type: DataTypes.STRING(),
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: 'review'
    }
);

module.exports = Review;