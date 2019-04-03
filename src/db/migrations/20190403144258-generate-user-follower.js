export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserFollower', {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        underscored: true,
      },
      followerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        underscored: true,
      },
    }),
  down: queryInterface => queryInterface.dropTable('UserFollower'),
};
