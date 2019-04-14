export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserRoles', {
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
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        field: 'role_id',
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('UserRoles'),
};
