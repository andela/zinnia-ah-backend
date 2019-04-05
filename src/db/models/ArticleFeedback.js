export default (sequelize, DataTypes) => {
  const ArticleFeedback = sequelize.define('ArticleFeedback', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'article_id',
      references: {
        model: 'Articles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    feedback: {
      type: DataTypes.ENUM('like', 'dislike'),
      allowNull: false,
    }
  }, {
    freezeTableName: true,
  });
  ArticleFeedback.associate = () => {
    // associations can be defined here
  };
  return ArticleFeedback;
};
