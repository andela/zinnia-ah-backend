export default (Sequelize, DataTypes) => {
  const Rating = Sequelize.define(
    'Rating',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: 'user_id',
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'article_id',
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  Rating.associate = models => {
    // associations can be defined here
    Rating.belongsTo(models.Article, {
      through: 'article_id',
    });
  };
  return Rating;
};
