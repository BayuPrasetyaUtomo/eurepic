"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = [
      {
        name: "nature",
      },
      {
        name: "object",
      },
      {
        name: "landscape",
      },
    ];
    // console.log(data);
    const seed = data.map((item) => {
      (item.createdAt = new Date()), (item.updatedAt = new Date());
      return item;
    });
    await queryInterface.bulkInsert("Tags", seed, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.deleteInsert("Tags", null, {})
  },
};
