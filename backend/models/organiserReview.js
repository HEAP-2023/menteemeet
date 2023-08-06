const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrganiserReview = sequelize.define(
    "OrganiserReview",
    {
        organiser_review_id: {
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
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING(),
            allowNull: true
        }
    },
    {
      timestamps: false,
      tableName: 'organiserreview'
    }
);

module.exports = OrganiserReview;