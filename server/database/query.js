import pool from './dbConfig';
import dropTables from './migrations/v1/drop';
import createTables from './migrations/v1/create';
import seedTables from './seeds/v1/seed';

const queryMigrations = async () => {
  try {
    await pool.query(dropTables.votesTable);
    await pool.query(dropTables.type);
    await pool.query(dropTables.commentsTable);
    await pool.query(dropTables.rsvpsTable);
    await pool.query(dropTables.questionsTable);
    await pool.query(dropTables.usersTable);
    await pool.query(dropTables.meetupsTable);
    await pool.query(createTables.meetupsTable);
    await pool.query(createTables.usersTable);
    await pool.query(createTables.questionsTable);
    await pool.query(createTables.rsvpsTable);
    await pool.query(createTables.commentsTable);
    await pool.query(createTables.votesTable);
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

queryMigrations();
