export default (sequelize, DataTypes) => {
  const CommentLike = sequelize.define(
    'CommentLike',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
      },
      commentId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'comment_id',
      },
    },
    {}
  );
  CommentLike.associate = () => {
    // associations can be defined here
  };
  return CommentLike;
};
