const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define(
    "Comment",
    {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        description: {
          type: DataTypes.STRING(),
          allowNull: false,
        },
        upvote_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        downvote_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_reply: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'comment'
    }
);

module.exports = Comment;