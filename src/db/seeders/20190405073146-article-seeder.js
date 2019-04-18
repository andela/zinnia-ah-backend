import uuidv4 from 'uuidv4';
import slug from 'slug';

export default {
  up: async queryInterface =>
    await queryInterface.bulkInsert('Articles', [
      {
        id: '141f4f05-7d81-4593-ab54-e256c1006210',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'EMMSDAN article',
        slug: slug(`Hello Article 1-${uuidv4()}`),
        description: 'Emmanuel Daniel uses this article',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '461be77c-587c-49f7-983e-58d0b69a93f4',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Messi: the GOAT',
        slug: slug(`Messi: the GOAT-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '47d790b9-9995-40df-a1e6-c3ad634253ef',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'How to live long',
        slug: slug(`How to live long-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '48d6899d-a49a-4a36-9573-9f04961989f6',
        user_id: '3231983a-b944-4c53-a549-f561f7474428',
        title: 'Giving back to the community',
        slug: slug(`Giving back to the community-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '0aedc83d-5172-4874-bc43-7826e955fccb',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'DC owns this article',
        slug: slug('Hello-Article-5-3b8ab5fa-c594-4d5a-be6c-0b56888bb299'),
        description: 'Dimkpa Opara uses this article to run his tests',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: 'cd75c9de-324e-4b7e-be68-64c0ce09bd4d',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'DC property',
        slug: slug(`Hello Article 8-${uuidv4()}`),
        description: 'Dimkpa Opara uses this article to run his tests',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: uuidv4(),
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Hello Article 9',
        slug: 'Hello-Article-9-5a6fab9c-5849-4be5-973c-5a371165cd5',
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '5d385a55-5089-4ae4-83af-767dbe106f4c',
        user_id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
        title: 'Owning your learning in life',
        slug: slug(`Owning your learning in life-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '747d9de5-e272-4201-bcfc-6d703aa5a6a5',
        user_id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
        title: 'Hello Article 10',
        slug: slug(`Hello Article 10-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '77b17aab-cff8-43f6-81e1-3f0d3afeb23b',
        user_id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
        title: 'Hello Article 11',
        slug: slug(`Hello Article 11-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '795bb49c-1a36-4b55-adf3-865088acb3b6',
        user_id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
        title: 'Hello Article 12',
        slug: slug(`Hello Article 12-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: 'd6b9565b-a9de-4d46-ac04-b5e3bc12c22a',
        user_id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
        title: 'Hello Article 13',
        slug: slug(`Hello Article 13-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '7c6060e6-cbe3-41cc-b889-5901892c904d',
        user_id: '3231983a-b944-4c53-a549-f561f7474428',
        title: 'Hello Article 14',
        slug: slug(`Hello Article 14-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '88f5e45f-0c85-49c1-ba82-baf3b0129678',
        user_id: '3231983a-b944-4c53-a549-f561f7474428',
        title: 'Hello Article 15',
        slug: slug(`Hello Article 15-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '8d779273-a5d3-4e48-8887-a412cc091353',
        user_id: '34745e2c-772c-41df-916c-375958882184',
        title: 'Hello Article 16',
        slug: slug(`Hello Article 16-${uuidv4()}`),
        description: 'Description goes here',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '931a52df-8f8b-4ea1-bce8-a3caab25c2e0',
        user_id: '34745e2c-772c-41df-916c-375958882184',
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
        id: '49b55c18-a23f-4a2f-a5de-30fd7a095599',
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
        id: '4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Test Article for likes and unlikes',
        slug: slug('Hello Article 31-4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f'),
        description: 'UGOJI added this article to run his tests',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
      {
        id: '8ebdfc3c-ffd7-440a-80f3-ab4ebeeb9cae',
        user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
        title: 'Highlights Test Article',
        slug: slug('Hello Article 5-842afa04-cc9e-43ad-9384-007793d3fdcb'),
        description: 'Description goes here, Eben',
        body: 'Another Body',
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      },
    ]),
  down: async queryInterface => queryInterface.bulkDelete('Articles', null, {}),
};
