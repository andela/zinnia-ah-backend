export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Highlights', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      articleId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        field: 'article_id',
        references: {
          model: 'Articles',
          key: 'id',
        },
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      highlightedText: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'highlighted_text',
      },
      startIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'start_index',
      },
      stopIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'stop_index',
      },
      comment: {
        type: Sequelize.TEXT,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Highlights');
  },
};
