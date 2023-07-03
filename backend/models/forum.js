const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Forum = sequelize.define(
    "Forum",
    {
        forum_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        num_of_comments: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }
    },
    {
      timestamps: false,
      tableName: 'forum'
    }
);

module.exports = Forum;