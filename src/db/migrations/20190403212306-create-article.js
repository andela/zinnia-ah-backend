import {
  PREMIUM,
  FREE,
  DRAFT,
  TRASHED,
  PUBLISHED,
  BANNED,
} from '../../utils/constants';

export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Articles', {
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
      slug: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageThumbnail: {
        type: Sequelize.TEXT,
        field: 'image_thumbnail',
        allowNull: true,
      },
      subscriptionType: {
        type: Sequelize.ENUM(FREE, PREMIUM),
        field: 'subscription_type',
        defaultValue: FREE,
      },
      status: {
        type: Sequelize.ENUM(PUBLISHED, DRAFT, TRASHED, BANNED),
        defaultValue: DRAFT,
      },
      readTime: {
        type: Sequelize.STRING,
        field: 'read_time',
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
    }),
  down: queryInterface => queryInterface.dropTable('Articles'),
};
