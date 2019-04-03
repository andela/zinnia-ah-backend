import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../db/models';
import app from '../../../server';


// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

let userToken;

before(async () => {
  await models.sequelize.sync({ force: true });
});
const url = '/api/v1/users';
const confirmationUrl = '/api/v1/confirmation';
const userRequestObject = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
};

describe('CREATE USER', () => {
  it('should create a user successfully when valid input are supplied', (done) => {
    chai.request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        userToken = res.body.token;
        done();
      });
  });
  it('should confirm a user', (done) => {
    chai.request(app)
      .get(`${confirmationUrl}/${userToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should fail creation when email is already in use', (done) => {
    chai.request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
  it('should fail creation when username is already in use', (done) => {
    chai.request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});
