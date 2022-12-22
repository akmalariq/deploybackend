'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Cars', [
      {
        name: 'kijang',
        type: 'sedan',
        dailyPrice: 123e5,
        size: 'medium',
        imgURL: 'resume.lockonmaram.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'maram',
        updatedBy: null,
        deletedBy: null
      },
      {
        name: 'estillo',
        type: 'sedan',
        dailyPrice: 123e5,
        size: 'medium',
        imgURL: 'resume.lockonmaram.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'maram',
        updatedBy: null,
        deletedBy: null
      },
      {
        name: 'civic',
        type: 'sedan',
        dailyPrice: 123e5,
        size: 'medium',
        imgURL: 'resume.lockonmaram.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'maram',
        updatedBy: null,
        deletedBy: null
      },
      {
        name: 'vw kodok',
        type: 'sedan',
        dailyPrice: 123e5,
        size: 'medium',
        imgURL: 'resume.lockonmaram.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'maram',
        updatedBy: null,
        deletedBy: null
      },
      {
        name: 'harley',
        type: 'sedan',
        dailyPrice: 123e5,
        size: 'medium',
        imgURL: 'resume.lockonmaram.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'maram',
        updatedBy: null,
        deletedBy: null
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
