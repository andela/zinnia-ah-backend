import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configuration from '../../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = configuration[env];
const db = {};
<<<<<<< HEAD

// enable logs only in development environment
config.logging = process.env.NODE_ENV === 'development';
=======
>>>>>>> 164797145 Build validation to protect user creation endpoint (#16)

// enable logs only in development environment
config.logging = process.env.NODE_ENV === 'development';

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
