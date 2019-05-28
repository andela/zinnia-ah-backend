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
          tag_id: '9a2cbe71-5fee-4d77-9bff-40943789b1c7',
          article_id: '931a52df-8f8b-4ea1-bce8-a3caab25c2e0',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: '9a2cbe71-5fee-4d77-9bff-40943789b1c7',
          article_id: '0aedc83d-5172-5874-bc43-7826e945fccc',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: '9a2cbe71-5fee-4d77-9bff-40943789b1c7',
          article_id: '310f2591-ae59-4e28-bc0c-602883cac4c7',
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
          tag_id: 'a29a6f6e-826d-48f5-9f64-d0a6247cafc2',
          article_id: 'cd75c9de-324e-4b7e-be68-64c0ce09bd4d',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a29a6f6e-826d-48f5-9f64-d0a6247cafc2',
          article_id: '3375c9de-324e-4b7e-be68-64c12e09bd4d',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a29a6f6e-826d-48f5-9f64-d0a6247cafc2',
          article_id: 'cd75c1de-324e-4b7e-be68-64c0ce09bdd4',
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
          tag_id: 'b1487267-0ea7-4068-a74f-46d04dc43dc0',
          article_id: '4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'b1487267-0ea7-4068-a74f-46d04dc43dc0',
          article_id: '8ebdfc3c-ffd7-440a-80f3-ab4ebeeb9cae',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'b1487267-0ea7-4068-a74f-46d04dc43dc0',
          article_id: '4ec884b7-c450-4fe3-9db2-4e3e8c308e5f',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a76b51db-f45e-43c1-abe1-65f28037a7fd',
          article_id: '48d6899d-a49a-4a36-9573-9f04961989f6',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a76b51db-f45e-43c1-abe1-65f28037a7fd',
          article_id: '795bb49c-1a36-4b55-adf3-865088acb3b6',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a76b51db-f45e-43c1-abe1-65f28037a7fd',
          article_id: '88f5e45f-0c85-49c1-ba82-baf3b0129678',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuidv4(),
          tag_id: 'a76b51db-f45e-43c1-abe1-65f28037a7fd',
          article_id: '8d779273-a5d3-4e48-8887-a412cc091353',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: queryInterface => queryInterface.bulkDelete('ArticleTags', null, {}),
};
