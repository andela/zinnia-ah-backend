import uuidv4 from 'uuidv4';

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'ArticleTags',
      [
        {
          id: uuidv4(),
          tag_id: '9a2cbe71-5fee-4d77-9bff-40943789b1c7',
          article_id: '461be77c-587c-49f7-983e-58d0b69a93f4',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a29a6f6e-826d-48f5-9f64-d0a6247cafc2',
          article_id: '47d790b9-9995-40df-a1e6-c3ad634253ef',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'b1487267-0ea7-4068-a74f-46d04dc43dc0',
          article_id: '48d6899d-a49a-4a36-9573-9f04961989f6',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a76b51db-f45e-43c1-abe1-65f28037a7fd',
          article_id: '49b55c18-a23f-4a2f-a5de-30fd7a095599',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: queryInterface => queryInterface.bulkDelete('ArticleTags', null, {}),
};
