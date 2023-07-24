'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
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

  await queryInterface.createTable('Posts', {
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
    }
});


     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
    await queryInterface.dropTable('Comments');
  }
};
