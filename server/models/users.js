module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
<<<<<<< HEAD
    firstName: {
=======
    ffirstName: {
>>>>>>> [chore #164797136]Setup migration for database
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
