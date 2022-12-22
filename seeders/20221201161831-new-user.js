'use strict';
const bcrypt = require('bcrypt')
const SALT_ROUND = 10
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
    
    await queryInterface.bulkInsert('Users', [
      {
        name: 'akmal',
        email: 'akmal@email.com',
        password: await bcrypt.hash('akmal1234', SALT_ROUND),
        role: 'superadmin',
        imgURL: 'https://randomuser.me/api/portraits/men/1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'akmal',
        updatedBy: null,
        deletedBy: null
      },
      {
        name: 'ariq',
        email: 'ariq@email.com',
        password: await bcrypt.hash('ariq12345', SALT_ROUND),
        role: 'admin',
        imgURL: 'https://randomuser.me/api/portraits/men/1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'ariq',
        updatedBy: null,
        deletedBy: null
      },
      {
        name: 'abel',
        email: 'abel@email.com',
        password: await bcrypt.hash('abel12345', SALT_ROUND),
        role: 'member',
        imgURL: 'https://randomuser.me/api/portraits/men/1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: 'abel',
        updatedBy: null,
        deletedBy: null
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
