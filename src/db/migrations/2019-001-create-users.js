export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
      underscored: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      underscored: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: false,
      underscored: true,
    },
    socialProvider: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    socialId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      underscored: true,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      underscored: true,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
