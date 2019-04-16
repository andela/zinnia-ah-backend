export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ArticleTags', {
      tagId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      articleId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Articles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('ArticleTags'),
};
