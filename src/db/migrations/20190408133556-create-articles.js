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
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      subcriptionType: {
        type: Sequelize.ENUM('free', 'premium'),
        field: 'subcription_type',
        defaultValue: 'free',
      },
      status: {
        type: Sequelize.ENUM('published', 'draft', 'trashed', 'banned'),
        defaultValue: 'draft',
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
