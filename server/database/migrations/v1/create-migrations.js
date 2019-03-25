import pool from '../../dbConfig';
import createTables from './create';

const createMigrations = async () => {
  try {
    await pool.query(createTables.meetupsTable);
    await pool.query(createTables.usersTable);
    await pool.query(createTables.questionsTable);
    await pool.query(createTables.rsvpsTable);
    await pool.query(createTables.commentsTable);
    await pool.query(createTables.votesTable);
  } catch (error) {
    console.log(error);
  }
};
createMigrations();

export default createMigrations();
