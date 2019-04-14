export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'UserRoles',
      [
        {
          user_id: '4c6fab4c-3926-4be5-166c-4a911165cd35',
          role_id: '565ad3cd-383b-4bd7-9c11-8038bdf8d46f',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          role_id: 'e2835634-081f-4dc7-bca5-ba2380d45eae',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete('UserRoles', null, {}),
};
