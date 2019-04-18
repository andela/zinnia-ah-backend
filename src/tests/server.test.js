import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('UNAVAILABLE ROUTES', () => {
  it('should respond with a status of 404 if route is not available', done => {
    chai
      .request(app)
      .post('/anything')
      .end((err, res) => {
        expect(res.status).to.equal(405);
        expect(res.body.error).to.equal('Method not allowed');
        done();
      });
  });
});

describe('SWAGGER ROUTES', () => {
  it('should respond with a status ', done => {
    chai
      .request(app)
      .get('/doc')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.info.title).to.equal('Authors Haven API');
        expect(res.body.info.version).to.equal('1.0.0');
        expect(res.body.info.description).to.equal(
          'Official API Documentation for Authors Haven',
        );
        expect(res.body.paths).to.be.an('object');
        done();
      });
  });
});
