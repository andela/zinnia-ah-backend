module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    articleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'article_id',
    },
  }, {});
  Bookmark.associate = () => {
    // associations can be defined here
  };
  return Bookmark;
};
