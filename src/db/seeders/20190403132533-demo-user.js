module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    username: 'igbominadeveloper',
    email: 'igbominadeveloper@ah.com',
    password: 'password1',
    createdAt: Sequelize.literal('NOW()'),
    updatedAt: Sequelize.literal('NOW()')
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
