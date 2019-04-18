export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CommentHistories', {
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
      commentId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'comment_id',
        references: {
          model: 'Comments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      archivedComment: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'archived_comment',
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
  down: queryInterface => queryInterface.dropTable('CommentHistories'),
};
