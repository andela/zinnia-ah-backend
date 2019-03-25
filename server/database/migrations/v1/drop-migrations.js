import pool from '../../dbConfig';
import dropTables from './drop';

const dropMigrations = async () => {
  try {
    await pool.query(dropTables.votesTable);
    await pool.query(dropTables.type);
    await pool.query(dropTables.commentsTable);
    await pool.query(dropTables.rsvpsTable);
    await pool.query(dropTables.questionsTable);
    await pool.query(dropTables.usersTable);
    await pool.query(dropTables.meetupsTable);
  } catch (error) {
    console.log(error);
  }
};

dropMigrations();

export default dropMigrations();
