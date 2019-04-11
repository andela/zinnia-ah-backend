export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ArticleTags',
      {
        tagId: {
          type: Sequelize.UUID,
          allowNull: false,
          field: 'tag_id',
          references: {
            model: 'Tags',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        articleId: {
          type: Sequelize.UUID,
          allowNull: false,
          field: 'article_id',
          references: {
            model: 'Articles',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      },
      { timestamps: false },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ArticleTags');
  },
};
