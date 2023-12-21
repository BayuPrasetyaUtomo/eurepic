/**
 * Tags 
 * npx sequelize-cli model:generate --name Tag --attributes name:string
 * 
 * Users 
 * npx sequelize-cli model:generate --name User --attributes username:string,password:string
 * 
 * Pictures
 * npx sequelize-cli model:generate --name Picture --attributes title:string,description:string,uploadDate:date,url:string,UserId:integer
 * 
 * Profiles
 * npx sequelize-cli model:generate --name Profiles --attributes firstname:string,lastname:string,email:string,profilePicture:string,UserId:integer
 * 
 * TagForPicture
 * npx sequelize-cli model:generate --name TagForPicture --attributes PictureId:integer,TagId:integer
 * 
 * 
 * 
 * 
 * 
 */



npx sequelize-cli migration:generate --name removeColumn-uploadDate

 'use strict';

 /** @type {import('sequelize-cli').Migration} */
 module.exports = {
   async up (queryInterface, Sequelize) {
     /**
      * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.removeColumn('Pictures', 'uploadDate', {type: Sequelize.DATE});
   },

   async down (queryInterface, Sequelize) {
     /**
      * Add reverting commands here.
      *
      * Example:
      * await queryInterface.dropTable('users');
      */
     await queryInterface.dropTable('Pictures');
   }
 };



npx sequelize-cli migration:generate --name addColumn-role

 'use strict';

 /** @type {import('sequelize-cli').Migration} */
 module.exports = {
   async up (queryInterface, Sequelize) {
     /**
      * Add altering commands here.
      *
      * Example:
      * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
     await queryInterface.addColumn('Users', 'role', {type: Sequelize.STRING});

   },

   async down (queryInterface, Sequelize) {
     /**
      * Add reverting commands here.
      *
      * Example:
      * await queryInterface.dropTable('users');
      */
     await queryInterface.removeColumn('Users', 'role');
   }
 };

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

ToDo

1. Migrations dan Seeders
2. 