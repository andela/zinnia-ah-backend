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
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: '4c6fab4c-3926-4be5-166c-4a911165cd35',
          username: 'superadmin',
          email: 'admin@ah.com',
          password: await hashPassword('password1'),
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: '34745e2c-772c-41df-916c-375958882184',
          username: 'gentlejane',
          email: 'giant@gmail.com',
          password: await hashPassword('smiley007'),
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: '3231983a-b944-4c53-a549-f561f7474428',
          username: 'janesmith',
          email: 'jsmith@gmail.com',
          password: await hashPassword('hhrtuyhgty5t678'),
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
        {
          id: '856423fd-9c61-40e6-a72c-bd4cc9bdd880',
          username: 'Dctester',
          email: 'Dctester@gmail.com',
          password: await hashPassword('testseeder'),
          created_at: new Date().toLocaleString(),
          updated_at: new Date().toLocaleString(),
        },
      ],
      {},
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
