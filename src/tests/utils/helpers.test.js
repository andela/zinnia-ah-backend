import chai from 'chai';
import chaiHttp from 'chai-http';

import { generateToken } from '../../utils/helpers.utils';

chai.use(chaiHttp);
const { expect } = chai;

describe('Helper module', () => {
  context('Generate token', () => {
    it('should generate a token', () => {
      const result = generateToken({ id: 22 });
      expect(result).to.be.a('String');
    });
  });
});
