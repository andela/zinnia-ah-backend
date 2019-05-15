import { ADMIN, AUTHOR } from '../../utils/constants';

export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: Sequelize.TEXT,
      interests: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      image: Sequelize.TEXT,
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_email_verified',
      },
      socialProvider: {
        type: Sequelize.STRING,
        field: 'social_provider',
      },
      socialId: {
        type: Sequelize.STRING,
        field: 'social_id',
      },
      role: {
        type: Sequelize.ENUM(AUTHOR, ADMIN),
        defaultValue: AUTHOR,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
