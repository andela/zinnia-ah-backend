import {
  PREMIUM,
  FREE,
  DRAFT,
  TRASHED,
  PUBLISHED,
  BANNED,
} from '../../utils/constants';

export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
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
    subscriptionType: {
      type: DataTypes.ENUM(FREE, PREMIUM),
      field: 'subscription_type',
      defaultValue: FREE,
    },
    status: {
      type: DataTypes.ENUM(PUBLISHED, DRAFT, TRASHED, BANNED),
      defaultValue: DRAFT,
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
  });

  Article.associate = models => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
    Article.hasMany(models.Highlight, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
    Article.belongsToMany(models.Tag, {
      foreignKey: 'articleId',
      otherKey: 'tagId',
      through: 'ArticleTags',
      as: 'tags',
      timestamps: false,
    });
    Article.hasMany(models.Rating, {
      foreignKey: 'articleId',
      as: 'ratings',
    });
    Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'comments',
    });
  };
  return Article;
};
