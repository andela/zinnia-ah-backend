export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      articleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        field: 'id',
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      body: DataTypes.TEXT,
      imageList: {
        type: DataTypes.STRING,
        field: 'image_list',
      },
      tagList: {
        type: DataTypes.STRING,
        field: 'tag_list',
      },
      favoriteCount: {
        type: DataTypes.STRING,
        field: 'favorite_count',
      },
      readTime: {
        type: DataTypes.STRING,
        field: 'read_time',
      },
      subcriptionType: {
        type: DataTypes.ENUM('free', 'premium'),
        field: 'subcription_type',
      },
      status: DataTypes.ENUM('published', 'draft', 'trash', 'banned'),
    },
    {},
  );
  Article.associate = models => {
    Article.belongsTo(models.User);
  };
  return Article;
};
