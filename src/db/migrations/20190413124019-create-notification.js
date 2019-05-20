export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      notification: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      notificationType: {
        allowNull: false,
        type: Sequelize.ENUM('follow', 'article', 'comment', null),
        field: 'notification_type',
      },
      notificationTypeId: {
        allowNull: true,
        type: Sequelize.UUID,
        field: 'notification_type_id',
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        field: 'user_id',
      },
      isRead: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        field: 'is_read',
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Notifications');
  },
};
