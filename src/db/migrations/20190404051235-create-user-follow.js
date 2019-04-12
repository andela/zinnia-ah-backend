export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserFollower', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      followerId: {
        allowNull: false,
        type: Sequelize.UUID,
        field: 'follower_id',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable('UserFollower'),
};
