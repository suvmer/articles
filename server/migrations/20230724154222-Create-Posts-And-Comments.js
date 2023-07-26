'use strict';

const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(Posts.tableName, Posts.getAttributes(), Posts.options);
    await queryInterface.createTable(Comments.tableName, Comments.getAttributes(), Comments.options);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
    await queryInterface.dropTable('Comments');
  }
};
