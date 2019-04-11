export default (sequelize, DataTypes) => {
  const ArticleLikes = sequelize.define('ArticleLikes', {
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
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE,
    },
  });
  ArticleLikes.associate = () => {
    // associations can be defined here
  };
  return ArticleLikes;
};
