module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleFeedback', {
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
    feedback: {
      type: Sequelize.ENUM('like', 'dislike'),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('ArticleFeedback')
};
