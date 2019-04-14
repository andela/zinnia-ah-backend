export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Roles',
      [
        {
          id: '565ad3cd-383b-4bd7-9c11-8038bdf8d46f',
          name: 'admin',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: 'e2835634-081f-4dc7-bca5-ba2380d45eae',
          name: 'author',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
      ],
      {},
    ),

  down: queryInterface => queryInterface.bulkDelete('Roles', null, {}),
};
