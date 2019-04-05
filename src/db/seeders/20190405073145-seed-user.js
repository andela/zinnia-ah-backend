export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
    {
      id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
      username: 'igbominadeveloper',
      email: 'igbominadeveloper@ah.com',
      password: '$2a$08$FaLCM57LR8X4apZYpKeVb.1XC082FTmkhWp3//j3TVr2XHYg.fuDK',
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
