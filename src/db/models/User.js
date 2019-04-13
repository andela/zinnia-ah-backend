import bcrypt from 'bcryptjs';

import { ADMIN, AUTHOR } from '../../utils/constants';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      bio: DataTypes.TEXT,
      interests: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      role: {
        type: DataTypes.ENUM(AUTHOR, ADMIN),
        defaultValue: AUTHOR,
        allowNull: false,
      },
      image: DataTypes.TEXT,
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'is_email_verified',
      },
      socialProvider: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'social_provider',
      },
      socialId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'social_id',
      },
      subscribedForNotification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'subscribed_for_notification',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      hooks: {
        beforeCreate: user => user.password && user.hashPassword(),
      },
    },
  );
  User.associate = models => {
    // associations can be defined here
    User.belongsToMany(models.User, {
      foreignKey: 'userId',
      otherKey: 'followerId',
      through: 'UserFollower',
      as: 'followers',
      timestamps: false,
    });
    User.belongsToMany(models.User, {
      foreignKey: 'followerId',
      otherKey: 'userId',
      through: 'UserFollower',
      as: 'followings',
      timestamps: false,
    });
    User.hasMany(models.Article);
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'publications',
    });
    User.belongsToMany(models.Article, {
      foreignKey: 'user_id',
      otherKey: 'article_id',
      through: 'ArticleLikes',
      as: 'likes',
      timestamps: false,
    });
    User.belongsToMany(models.Article, {
      foreignKey: 'user_id',
      otherKey: 'article_id',
      through: 'Bookmarks',
      as: 'bookmarks',
    });
    User.hasMany(models.Highlight, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    User.hasMany(models.ReadingStat, {
      foreignKey: 'userId',
      as: 'readingStat',
    });
  };

  User.prototype.hashPassword = async function hashPassword() {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    return this.password;
  };

  return User;
};
