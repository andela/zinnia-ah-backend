import pool from '../../dbConfig';
import seedTables from './seed';

const seedMigrations = async () => {
  try {
    await pool.query(seedTables.meetupsTable);
    await pool.query(seedTables.usersTable);
    await pool.query(seedTables.questionsTable);
    await pool.query(seedTables.rsvpsTable);
    await pool.query(seedTables.commentsTable);
    await pool.query(seedTables.votesTable);
  } catch (error) {
    console.log(error);
  }
};

seedMigrations();

export default seedMigrations();
