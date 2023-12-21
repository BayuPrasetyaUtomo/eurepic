'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TagForPictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PictureId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pictures"
          }
        },
        key: "id"
      },
      TagId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Tags"
          }
        },
        key: "id"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TagForPictures');
  }
};