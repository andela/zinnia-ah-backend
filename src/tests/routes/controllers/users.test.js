import chai from 'chai';
import chaiHttp from 'chai-http';

import models from '../../../db/models';
import app from '../../../server';

chai.use(chaiHttp);
const { expect } = chai;
const { User } = models;

const userCredentials = {
  email: 'giant@gmail.com',
  password: 'smiley007',
  username: 'gentlejane',
};

const { email, password } = userCredentials;

const loginUrl = '/api/v1/auth/login';
const usersUrl = '/api/v1/users';
const profileUrl = '/api/v1/profiles/gentlejane';
let userToken = '';

describe('Authenticated Users functionality', () => {
  before(async () => {
    try {
      await User.sync({ force: true });
      return User.create(userCredentials);
    } catch (error) {
      return error.toString();
    }
  });

  beforeEach(async () => {
    try {
      const res = await chai
        .request(app)
        .post(loginUrl)
        .send({
          email,
          password,
        });
      userToken = res.body.data;
    } catch (error) {
      return error.message;
    }
  });

  context('GET all users', () => {
    it('should fetch all authors', async () => {
      const res = await chai
        .request(app)
        .get(usersUrl)
        .set('authorization', `Bearer ${userToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.be.a('String');
      expect(res.body.data[0]).to.be.an('object');
    });
  });

  context('GET user profile', () => {
    it('should return the author profile', async () => {
      const res = await chai
        .request(app)
        .get(profileUrl)
        .set('authorization', `Bearer ${userToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.be.a('String');
      expect(res.body.data)
        .to.be.an('object')
        .to.have.property('username');
    });
  });
});
