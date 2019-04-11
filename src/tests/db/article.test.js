import chai from 'chai';
import chaiHttp from 'chai-http';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('Multiplication', () => {
  it('should multiply numbers', () => {
    expect(2 * 2).to.eql(4);
  });
});
