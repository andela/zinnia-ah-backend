/* eslint-disable indent */
import uuidv4 from 'uuidv4';
import slug from 'slug';

export default {
  up: async queryInterface =>
    await queryInterface.bulkInsert(
      'Articles',
      [
        {
          id: '141f4f05-7d81-4593-ab54-e256c1006210',
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article',
          slug: slug(`Hello Article 1-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 5',
          slug: slug(`Hello Article 5-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 6',
          slug: slug(`Hello Article 6-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 7',
          slug: slug(`Hello Article 7-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 8',
          slug: slug(`Hello Article 8-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 9',
          slug: slug(`Hello Article 9-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 10',
          slug: slug(`Hello Article 10-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 11',
          slug: slug(`Hello Article 11-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 12',
          slug: slug(`Hello Article 12-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 13',
          slug: slug(`Hello Article 13-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 14',
          slug: slug(`Hello Article 14-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 15',
          slug: slug(`Hello Article 15-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 16',
          slug: slug(`Hello Article 16-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 17',
          slug: slug(`Hello Article 17-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 18',
          slug: slug(`Hello Article 18-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 19',
          slug: slug(`Hello Article 19-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 20',
          slug: slug(`Hello Article 20-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 21',
          slug: slug(`Hello Article 21-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 22',
          slug: slug(`Hello Article 22-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 23',
          slug: slug(`Hello Article 23-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 24',
          slug: slug(`Hello Article 24-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 25',
          slug: slug(`Hello Article 25-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 26',
          slug: slug(`Hello Article 26-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 27',
          slug: slug(`Hello Article 27-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 28',
          slug: slug(`Hello Article 28-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 29',
          slug: slug(`Hello Article 29-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 30',
          slug: slug(`Hello Article 30-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: '0aedc83d-5172-4874-bc43-7826e955fccb',
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 5',
          slug: slug('Hello-Article-5-3b8ab5fa-c594-4d5a-be6c-0b56888bb299'),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: '310f2591-ae59-4e28-bc0c-602883cac4c7',
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 6',
          slug: slug(`Hello Article 6-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: 'b830836f-7aac-49ca-a1b9-a777d602ff0e',
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 7',
          slug: slug(`Hello Article 7-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: 'cd75c9de-324e-4b7e-be68-64c0ce09bd4d',
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 8',
          slug: slug(`Hello Article 8-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 9',
          slug: slug(`Hello Article 9-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 10',
          slug: slug(`Hello Article 10-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 11',
          slug: slug(`Hello Article 11-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 12',
          slug: slug(`Hello Article 12-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 13',
          slug: slug(`Hello Article 13-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 14',
          slug: slug(`Hello Article 14-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 15',
          slug: slug(`Hello Article 15-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 16',
          slug: slug(`Hello Article 16-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 17',
          slug: slug(`Hello Article 17-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 18',
          slug: slug(`Hello Article 18-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 19',
          slug: slug(`Hello Article 19-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 20',
          slug: slug(`Hello Article 20-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 21',
          slug: slug(`Hello Article 21-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 22',
          slug: slug(`Hello Article 22-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 23',
          slug: slug(`Hello Article 23-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 24',
          slug: slug(`Hello Article 24-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 25',
          slug: slug(`Hello Article 25-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 26',
          slug: slug(`Hello Article 26-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 27',
          slug: slug(`Hello Article 27-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 28',
          slug: slug(`Hello Article 28-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 29',
          slug: slug(`Hello Article 29-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 30',
          slug: slug(`Hello Article 30-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 5',
          slug: slug(`Hello Article 5-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 6',
          slug: slug(`Hello Article 6-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 7',
          slug: slug(`Hello Article 7-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          title: 'Hello Article 8',
          slug: slug(`Hello Article 8-${uuidv4()}`),
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
      ],
      {},
    ),
  down: async queryInterface => queryInterface.bulkDelete('Articles', null, {}),
};
