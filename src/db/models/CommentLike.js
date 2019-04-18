export default (sequelize, DataTypes) => {
  const CommentLike = sequelize.define(
    'CommentLike',
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
  CommentLike.associate = models => {
    CommentLike.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      otherKey: 'userId',
    });
  };
  return CommentLike;
};
