export default (sequelize, DataTypes) => {
  const Highlight = sequelize.define('Highlight', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.UUID,
      field: 'article_id',
    },
    userId: {
      type: DataTypes.UUID,
      field: 'user_id',
    },
    highlightedText: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'highlighted_text',
    },
    startIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'start_index',
    },
    stopIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'stop_index',
    },
    comment: {
      type: DataTypes.TEXT,
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
  });
  Highlight.associate = models => {
    Highlight.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });

    Highlight.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Highlight;
};
