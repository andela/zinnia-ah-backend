import nock from 'nock';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

chai.use(chaiHttp);

const baseUrl = 'http://localhost:3000';

const authentication = async path => {
  return await chai.request(baseUrl).get(`/api/v1/auth/${path}`);
};

// This test would show that the external authentication services were called successfully
describe('Social authentication', () => {
  describe('Facebook authentication', () => {
    before(() => {
      nock(baseUrl)
        .get('/api/v1/auth/facebook')
        .reply(200, {
          status: 'success',
          message:
            'You have successfully registered however you would need to check your mail to verify your account',
          data: [
            {
              token: 'token',
            },
          ],
        });
    });
    it('Should successfully login user', () => {
      return authentication('facebook').then(res => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.message).to.eql(
          'You have successfully registered however you would need to check your mail to verify your account',
        );
        expect(res.body.data[0].token).to.be.a('string');
      });
    });
  });
  describe('Twitter authentication', () => {
    before(() => {
      nock(baseUrl)
        .get('/api/v1/auth/twitter')
        .reply(200, {
          status: 'success',
          message:
            'You have successfully registered however you would need to check your mail to verify your account',
          data: [
            {
              token: 'token',
            },
          ],
        });
    });
    it('Should successfully login user', () => {
      return authentication('twitter').then(res => {
        expect(res.status).to.eql(200);
        expect(res.body.status).to.eql('success');
        expect(res.body.message).to.eql(
          'You have successfully registered however you would need to check your mail to verify your account',
        );
        expect(res.body.data[0].token).to.be.a('string');
      });
    });
  });
});
