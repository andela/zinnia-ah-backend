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
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('user'),
};
