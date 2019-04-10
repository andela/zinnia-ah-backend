export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      slug: Sequelize.STRING,
      title: Sequelize.STRING,
      description: Sequelize.STRING,
      body: Sequelize.TEXT,
      image_list: Sequelize.STRING,
      tag_list: Sequelize.STRING,
      favorite_count: Sequelize.STRING,
      read_time: Sequelize.STRING,
      subcription_type: Sequelize.STRING,
      status: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('Articles'),
};
