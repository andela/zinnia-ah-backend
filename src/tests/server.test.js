import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('UNAVAILABLE ROUTES', () => {
  it('should respond with a status of 404 if route is not available', done => {
    chai.request(app)
      .post('/anything')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('This route does not exist');
        done();
      });
  });
});
