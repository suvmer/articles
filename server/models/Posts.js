const { DataTypes } = require("sequelize");
const db = require("../db");
const Comments = require("./Comments");

const Posts = db.define('Posts',
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true
    }/*, //Sequelize manages that fields automatically. Good.
    created: {
        type: DataTypes.DATE,
        allowNull: false
    },
    edited: {
        type: DataTypes.DATE,
        allowNull: true
    }*/
});
Posts.hasMany(Comments, { as:"comments", foreignKey: 'post_id', targetKey: 'id'});
Comments.belongsTo(Posts, { foreignKey: 'post_id', targetKey: 'id'})
module.exports = Posts;