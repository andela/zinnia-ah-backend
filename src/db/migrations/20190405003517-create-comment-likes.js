export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CommentLikes', {
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
    commentId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'comment_id',
      references: {
        model: 'Comments',
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
    }
  }),
  down: queryInterface => queryInterface.dropTable('CommentLikes')
};
