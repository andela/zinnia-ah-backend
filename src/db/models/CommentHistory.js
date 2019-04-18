export default (sequelize, DataTypes) => {
  const CommentHistory = sequelize.define(
    'CommentHistory',
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
      },
      commentId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        field: 'comment_id',
      },
      archivedComment: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'archived_comment',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {},
  );
  CommentHistory.associate = models => {
    CommentHistory.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      otherKey: 'userId',
    });
  };
  return CommentHistory;
};
