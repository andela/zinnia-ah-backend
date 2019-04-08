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
      imageList: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        field: 'image_list',
      },
      tagList: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        field: 'tag_list',
      },
      favouritesCount: {
        type: Sequelize.INTEGER,
        field: 'favourites_count',
        defaultValue: 0,
      },
      subcriptionType: {
        type: Sequelize.ENUM('free', 'premium'),
        field: 'subcription_type',
        defaultValue: 'free',
      },
      status: {
        type: Sequelize.ENUM('published', 'draft', 'trash', 'banned'),
        defaultValue: 'draft',
      },
      readTime: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'read_time',
        defaultValue: 0,
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
