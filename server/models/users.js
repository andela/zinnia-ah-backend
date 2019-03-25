module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    ffirstName: {
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
