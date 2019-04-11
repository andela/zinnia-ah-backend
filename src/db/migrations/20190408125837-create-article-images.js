export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'ArticleImages',
      {
        imageId: {
          type: Sequelize.UUID,
          allowNull: false,
          field: 'image_id',
          references: {
            model: 'Images',
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

  down: queryInterface => {
    return queryInterface.dropTable('ArticleImages');
  },
};
