export default {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Tags',
      [
        {
          id: '9a2cbe71-5fee-4d77-9bff-40943789b1c7',
          name: 'technology',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'a29a6f6e-826d-48f5-9f64-d0a6247cafc2',
          name: 'sports',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'a76b51db-f45e-43c1-abe1-65f28037a7fd',
          name: 'andela',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'b1487267-0ea7-4068-a74f-46d04dc43dc0',
          name: 'lifestyle',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: queryInterface => queryInterface.bulkDelete('Tags', null, {}),
};
