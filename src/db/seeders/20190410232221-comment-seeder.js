export default {
  // eslint-disable-next-line no-return-await
  up: async queryInterface =>
    queryInterface.bulkInsert(
      'Comments',
      [{
        id: '08fd662d-ed92-419e-8af9-41afd3fb3d87',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        article_id: 'cd75c9de-324e-4b7e-be68-64c0ce09bd4d',
        body: 'Description goes here',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      }, ], {},
    ),
  down: async queryInterface => queryInterface.bulkDelete('Comments', null, {}),
};
