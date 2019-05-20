export default (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        allowNull: false,
      },
      notification: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      notificationType: {
        allowNull: false,
        type: DataTypes.ENUM('follow', 'article', 'comment', null),
        field: 'notification_type',
      },
      notificationTypeId: {
        allowNull: true,
        type: DataTypes.UUID,
        field: 'notification_type_id',
      },
      userId: {
        allowNull: true,
        type: DataTypes.UUID,
        field: 'user_id',
      },
      isRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_read',
      },
    },
    {},
  );
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return Notification;
};
