import uuidv4 from 'uuidv4';

module.exports = {
  // eslint-disable-next-line no-return-await
  up: async queryInterface => await queryInterface.bulkInsert('Users', [
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
    }
  ], {}),

  down: async queryInterface => queryInterface.bulkDelete('Articles', null, {})
};
