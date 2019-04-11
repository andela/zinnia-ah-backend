export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserFollowers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      followerId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'follower_id',
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    }),

  down: queryInterface => queryInterface.dropTable('UserFollowers'),
};
