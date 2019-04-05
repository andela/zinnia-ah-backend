module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.UUID,
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
    imageList: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      field: 'image_list',
    },
    tagList: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      field: 'tag_list',
    },
    favouritesCount: {
      type: DataTypes.INTEGER,
      field: 'favourites_count',
      default: 0,
    },
    subcriptionType: {
      type: DataTypes.ENUM('free', 'premium'),
      field: 'subcription_type',
      default: 'free',
    },
    status: {
      type: DataTypes.ENUM('published', 'draft', 'trash', 'banned'),
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
    }
  }, {
  });
  Article.associate = () => {

  };
  return Article;
};
