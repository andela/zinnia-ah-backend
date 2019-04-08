import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'last_name',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
        field: 'is_email_verified',
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
        beforeUpdate: user => user.password && user.hashPassword(),
      },
    }
  );
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
