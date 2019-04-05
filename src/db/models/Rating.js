export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'user_id',
    },
    articleId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      field: 'article_id',
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Rating.associate = () => {
    // associations can be defined here
  };
  return Rating;
};
