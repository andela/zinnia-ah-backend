export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('ArticleLikes', {
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'user_id',
        onDelete: 'CASCADE',
      },
      articleId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'article_id',
        onDelete: 'CASCADE',
      },
    }),
  down: queryInterface => queryInterface.dropTable('ArticleLikes'),
};
