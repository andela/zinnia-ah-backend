export default {
  up: async queryInterface =>
    queryInterface.bulkInsert(
      'Highlights',
      [
        {
          id: '8a4bba55-c5ea-4399-bc08-3524d0d5ba2a',
          article_id: '0aedc83d-5172-4874-bc43-7826e955fccb',
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          highlighted_text: 'Something to think about',
          start_index: '2',
          stop_index: '18',
          comment: 'This pushed me to the edge.',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
      ],
      {},
    ),
  down: async queryInterface =>
    queryInterface.bulkDelete('Highlights', null, {}),
};
