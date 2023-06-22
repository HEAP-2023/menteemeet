const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Forum = sequelize.define(
    "Forum",
    {
        FORUM_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        NUM_OF_COMMENTS: {
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