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
      },
      notificationTypeId: {
        allowNull: true,
        type: DataTypes.UUID,
      },
      isRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Notification;
};
