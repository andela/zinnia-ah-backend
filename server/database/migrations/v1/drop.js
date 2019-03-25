const dropTables = {
  votesTable: 'DROP TABLE IF EXISTS votes',
  type: 'DROP TYPE IF EXISTS type',
  commentsTable: 'DROP TABLE IF EXISTS comments',
  rsvpsTable: 'DROP TABLE IF EXISTS rsvps',
  questionsTable: 'DROP TABLE IF EXISTS questions',
  usersTable: 'DROP TABLE IF EXISTS users',
  meetupsTable: 'DROP TABLE IF EXISTS meetups',
};

export default dropTables;
