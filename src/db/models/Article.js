export default () => {
  const Article = sequelize.define(
    'Article',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        field: 'user_id',
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subcriptionType: {
        type: DataTypes.ENUM('free', 'premium'),
        field: 'subcription_type',
        default: 'free',
      },
      status: {
        type: DataTypes.ENUM('published', 'draft', 'trashed', 'banned'),
        default: 'draft',
      },
      readTime: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'read_time',
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
  Article.associate = () => {};
  return Article;
};
