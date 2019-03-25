import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_DEV_URL',
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
