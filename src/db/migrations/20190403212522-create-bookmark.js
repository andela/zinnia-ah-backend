export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Bookmarks', {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
      },
      articleId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'article_id',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Bookmarks'),
};
