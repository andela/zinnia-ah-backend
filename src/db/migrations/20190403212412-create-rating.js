export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Ratings', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    articleId: {
      type: Sequelize.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'article_id',
      references: {
        model: 'Articles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('Ratings')
};
