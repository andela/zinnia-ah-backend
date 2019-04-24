import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import {
  loginCredentials,
  signupCredentials,
  nonExistentUser,
} from '../../db/mockdata/userdata';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const { email } = loginCredentials;

const signupUrl = '/api/v1/auth/signup';
const loginUrl = '/api/v1/auth/login';
const confirmationUrl = '/api/v1/auth/users/confirmation';

describe('User registration', () => {
  let userToken;

  context('SIGN UP a user', () => {
    it('should create a user successfully when valid input are supplied', async () => {
      const res = await chai
        .request(app)
        .post(signupUrl)
        .send(signupCredentials);
      userToken = res.body.data.token;

      expect(res.status).to.equal(201);
      expect(res.body)
        .to.have.property('message')
        .to.be.a('String');
      expect(res.body.message).to.eql(
        'Please check your mail to verify your account',
      );
      expect(res.body.data).to.have.all.keys('token');
      expect(res.body.data.token).to.not.eql('');
    });

    it('should confirm a user', async () => {
      const res = await chai
        .request(app)
        .get(`${confirmationUrl}/${userToken}`);
      expect(res.status).to.equal(200);
    });
  });
});

describe('User Login Feature', () => {
  context('User can log in', () => {
    it('should return a token', async () => {
      const res = await chai
        .request(app)
        .post(loginUrl)
        .send(loginCredentials);
      expect(res.status).to.equal(200);
      expect(res.body)
        .to.have.property('data')
        .to.be.an('object');
      expect(res.body.data).to.not.eql('');
      expect(res.body)
        .to.have.property('message')
        .to.be.a('string');
      expect(res.body.data).to.include.deep.keys('user', 'token');
      expect(res.body.data)
        .to.have.property('token')
        .to.not.eql('');
      expect(res.body.data).to.nested.include({
        'user.email': email,
      });
    });
  });

  context('Non existent User should return a Not Found', () => {
    it('should return an error message Not found', async () => {
      const res = await chai
        .request(app)
        .post(loginUrl)
        .send(nonExistentUser);

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.be.a('String');
      expect(res.body.message).to.eql('Not found');
    });
  });

  context('Incorrect password', () => {
    it('should return an error message Incorrect password', async () => {
      const res = await chai
        .request(app)
        .post(loginUrl)
        .send({
          email,
          password: 'somethingdifferent',
        });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.be.a('String');
      expect(res.body.message).to.eql('Incorrect Password');
    });
  });
});
