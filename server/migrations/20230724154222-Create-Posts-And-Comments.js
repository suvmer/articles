'use strict';

const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(Posts.tableName, Posts.getAttributes(), Posts.options);
    await queryInterface.createTable(Comments.tableName, Comments.getAttributes(), Comments.options);
    /*await queryInterface.createTable('Comments', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      body: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true
      },
      post_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
      }
  });

  await queryInterface.createTable('Posts', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
    }
});*/


     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
    await queryInterface.dropTable('Comments');
  }
};
