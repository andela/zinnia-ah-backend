import { hashPassword } from '../../utils/helpers.utils';

export default {
  up: async queryInterface => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
          username: 'igbominadeveloper',
          email: 'igbominadeveloper@ah.com',
          password: await hashPassword('favourafolayan'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '34745e2c-772c-41df-916c-375958882184',
          username: 'gentlejane',
          email: 'giant@gmail.com',
          password: await hashPassword('smiley007'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '3231983a-b944-4c53-a549-f561f7474428',
          username: 'janesmith',
          email: 'jsmith@gmail.com',
          password: await hashPassword('hhrtuyhgty5t678'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '18651989-732f-4c04-9ddc-ea1f73818fd1',
          username: 'nedyudomabt',
          email: 'nedyudombat@ah.com',
          password: await hashPassword('nedyudombat'),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '6d1cdd96-c3b0-43d7-8446-a0db534a1c57',
          username: 'tinawhatsgood',
          email: 'tinawhatsgood@ah.com',
          password: await hashPassword('newtyronne'),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
