module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
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
    reportType: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'report_type',
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Reports')
};
