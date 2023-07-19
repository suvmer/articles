const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define('Comments',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
Comments.sync();
module.exports = Comments;
