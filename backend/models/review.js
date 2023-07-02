const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Review = sequelize.define(
    "Review",
    {
        review_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
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