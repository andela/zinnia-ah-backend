import nock from 'nock';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

chai.use(chaiHttp);

// This test would show that the external authentication services were called successfully
describe('Social authentication', () => {
  before(() => {
    nock('https://facebook.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, {
        status: 'success',
        message: 'You have successfully registered however you would need to check your mail to verify your account',
        data: [
          {
            token: 'token'
          }
        ]
      });
  });

  it('Should be done via FACEBOOK', (done) => {
    chai.request(app)
      .get('/api/v1/auth/facebook')
      .end((err, res) => {
        expect(res.body.message).to.eql('You have successfully registered however you would need to check your mail to verify your account');
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data[0].token).to.be.a('string');
        done();
      });
  });
  it('Should be done via TWITTER', (done) => {
    chai.request(app)
      .get('/api/v1/auth/twitter')
      .end((err, res) => {
        expect(res.body.message).to.eql('You have successfully registered however you would need to check your mail to verify your account');
        expect(res.body.status).to.be.equal('success');
        expect(res.body.data[0].token).to.be.a('string');
        done();
      });
  });
});
