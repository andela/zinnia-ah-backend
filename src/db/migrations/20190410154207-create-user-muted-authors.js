export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserMutedAuthors', {
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
      authorId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        field: 'author_id',
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('UserMutedAuthors');
  },
};
