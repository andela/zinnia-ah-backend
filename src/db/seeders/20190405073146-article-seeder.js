import uuidv4 from 'uuidv4';
import slug from 'slugify';

export default {
  // eslint-disable-next-line no-return-await
<<<<<<< HEAD
  up: async queryInterface =>
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: uuidv4(),
          user_id: uuidv4(),
          title: 'Hello Article',
          slug: `Hello Article ${uuidv4()}`,
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: uuidv4(),
          title: 'Hello Article 2',
          slug: `Hello Article ${uuidv4()}`,
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: uuidv4(),
          title: 'Hello Article 3',
          slug: `Hello Article ${uuidv4()}`,
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: uuidv4(),
          title: 'Hello Article 4',
          slug: `Hello Article ${uuidv4()}`,
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: uuidv4(),
          user_id: uuidv4(),
          title: 'Hello Article 5',
          slug: `Hello Article ${uuidv4()}`,
          description: 'Description goes here',
          body: 'Another Body',
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
      ],
      {},
    ),
=======
  up: async queryInterface => await queryInterface.bulkInsert('Articles', [
    {
      id: uuidv4(),
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
      title: 'Hello Article 2',
      slug: slug(`Hello Article 2-${uuidv4()}`),
      description: 'Description goes here',
      body: 'Another Body',
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    },
    {
      id: uuidv4(),
      user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
      title: 'Hello Article 3',
      slug: slug(`Hello Article 3-${uuidv4()}`),
      description: 'Description goes here',
      body: 'Another Body',
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    },
    {
      id: uuidv4(),
      user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
      title: 'Hello Article 4',
      slug: slug(`Hello Article 4-${uuidv4()}`),
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
    }
  ], {}),
>>>>>>> [chore] add seeders for articles and users

  down: async queryInterface => queryInterface.bulkDelete('Articles', null, {}),
};
