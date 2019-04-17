import {
  PLAGIARISM,
  ADULT_CONTENT,
  DISCRIMINATORY,
  PROFANITY,
  TERRORISM,
  OTHER,
} from '../../utils/constants';

export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
        type: Sequelize.ENUM(
          PLAGIARISM,
          ADULT_CONTENT,
          DISCRIMINATORY,
          PROFANITY,
          TERRORISM,
          OTHER,
        ),
        allowNull: false,
        field: 'report_type',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Reports'),
};
