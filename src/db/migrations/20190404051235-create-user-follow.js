export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UserFollowers', {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    followerId: {
      primaryKey: true,
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

  down: queryInterface => queryInterface.dropTable('UserFollowers')
};
