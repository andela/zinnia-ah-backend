export default (Sequelize, DataTypes) => {
  const Tags = Sequelize.define(
    'ArticleTags',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      tagId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        field: 'tag_id',
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      articleId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        field: 'article_id',
        references: {
          model: 'Articles',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
  Tags.associate = () => {
    // associations can be defined here
  };
  return Tags;
};
