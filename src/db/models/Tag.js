export default (Sequelize, DataTypes) => {
  const Tag = Sequelize.define(
    'Tag',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
  Tag.associate = models => {
    Tag.belongsToMany(models.Article, {
      foreignKey: 'tagId',
      otherKey: 'articleId',
      through: 'ArticleTags',
      timestamps: false,
      as: 'articles',
    });
  };
  return Tag;
};
