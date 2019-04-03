import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import {
  emptyUser,
  userWithInvalidEmail,
  userMissingEmail,
  userWithExistingEmail,
  userWithExistingUserName,
  userWithUsernameNotAlphanum,
  userMissingUsername,
  userMissingPassword,
  userWithPasswordLessThanEightChars,
} from '../mockdata/userdata';

chai.use(chaiHttp);

const { expect } = chai;
const endPoint = '/api/v1/users';

describe('User', () => {
  describe('POST /api/v1/users', () => {
    it('returns a 422 response code an empty request body is sent by user', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(emptyUser);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/username/);
      expect(response.body.errors[0]).to.match(/email/);
      expect(response.body.errors[0]).to.match(/password/);
    });

    it('returns an email field specific error message when email is not a valid email', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userWithInvalidEmail);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/valid email/);
    });

    it('returns specific error when email is missing from request', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userMissingEmail);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/email/);
      expect(response.body.errors[0]).to.match(/empty/);
    });

    it('returns specific error when username is missing from request', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userMissingUsername);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/username/);
      expect(response.body.errors[0]).to.match(/empty/);
    });

    it('returns specific error when username is not valid alphanumerics', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userWithUsernameNotAlphanum);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/username/);
      expect(response.body.errors[0]).to.match(/alpha-numeric characters/);
    });

    it('returns specific error when password is missing from request', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userMissingPassword);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/password/);
      expect(response.body.errors[0]).to.match(/empty/);
    });

    it('returns specific error when password is less than 8 characters', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userWithPasswordLessThanEightChars);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(422);
      expect(response.body.errors[0]).to.match(/password length must be at least 8 characters long/);
    });

    it('does not allow for choosing existing email address', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userWithExistingEmail);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(409);
      expect(response.body.errors[0]).to.match(/email is already taken/);
    });

    it('does not allow for username duplication', async () => {
      const response = await chai.request(app)
        .post(endPoint)
        .send(userWithExistingUserName);

      expect(response.body).to.have.key('errors', 'status');
      expect(response.body.status).to.be.eql(409);
      expect(response.body.errors[0]).to.match(/username is already taken/);
    });
  });
});
