export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserFollower', {
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      followerId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('UserFollower'),
};
