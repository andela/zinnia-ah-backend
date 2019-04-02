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
          password:
            '$2a$08$FaLCM57LR8X4apZYpKeVb.1XC082FTmkhWp3//j3TVr2XHYg.fuDK',
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
      ],
      {},
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
