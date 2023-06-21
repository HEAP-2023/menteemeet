const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define(
    "Comment",
    {
        COMMENT_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        DESCRIPTION: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        UPVOTE_COUNT: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DOWNVOTE_COUNT: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ISREPLY: {
            type: DataTypes.boolean(),
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'comment'
    }
);

module.exports = Comment;