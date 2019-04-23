export default (sequelize, DataTypes) => {
  const ReadingStat = sequelize.define('ReadingStat', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'article_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  });
  ReadingStat.associate = models => {
    ReadingStat.belongsTo(models.Article, {
      foreignKey: 'articleId',
      as: 'article',
    });
  };
  return ReadingStat;
};
