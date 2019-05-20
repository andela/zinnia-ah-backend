export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'UserFollower',
      [
        {
          userId: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
          followerId: '3231983a-b944-4c53-a549-f561f7474428',
        },
        {
          userId: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
          followerId: '18651989-732f-4c04-9ddc-ea1f73818fd1',
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserFollower', null, {});
  },
};
