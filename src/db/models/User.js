import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    socialProvider: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    socialId: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    hooks: {
      beforeCreate: user => user.password && user.hashPassword(),
      beforeUpdate: user => user.password && user.hashPassword()
    },
  });
  User.associate = () => {
    // associations can be defined here
  };

  User.prototype.hashPassword = async function hashPassword() {
    const salt = 10;
    this.password = await bcrypt.hash(this.password, salt);
    return this.password;
  };

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
