export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
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
    isEmailVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      underscored: true,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      underscored: true
    },
  }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
