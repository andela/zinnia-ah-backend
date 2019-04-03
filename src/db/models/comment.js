module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'article_id',
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Comment.associate = () => {
    // associations can be defined here
  };
  return Comment;
};
