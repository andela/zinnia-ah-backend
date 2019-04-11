import nock from 'nock';
import chai, { expect } from 'chai';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const authentication = async path => {
  const result = await axios
    .get(`${baseUrl}/api/v1/auth/${path}`)
    .then(res => res.data)
    .catch(err => {
      console.log(err.message);
    });
  return result;
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
        expect(res.status).to.eql('success');
        expect(res.message).to.eql(
          'You have successfully registered however you would need to check your mail to verify your account',
        );
        expect(res.data[0].token).to.be.a('string');
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
        expect(res.status).to.eql('success');
        expect(res.message).to.eql(
          'You have successfully registered however you would need to check your mail to verify your account',
        );
        expect(res.data[0].token).to.be.a('string');
      });
    });
  });
});
