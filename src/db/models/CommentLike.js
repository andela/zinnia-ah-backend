export default (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'user_id',
    },
    commentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'comment_id',
    },
  }, {});
  CommentLike.associate = () => {
    // associations can be defined here
  };
  return CommentLike;
};
