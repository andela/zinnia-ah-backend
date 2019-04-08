export default (Sequelize, DataTypes) => {
  const Bookmark = Sequelize.define(
    'Bookmark',
    {
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
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'article_id',
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
    {}
  );
  Bookmark.associate = () => {
    // associations can be defined here
  };
  return Bookmark;
};
