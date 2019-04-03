import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../db/models';
import app from '../../../server';


// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

before(async () => {
  await models.sequelize.sync({ force: true });
});
const url = '/api/v1/users';
const confirmationUrl = '/api/v1/users/confirmation';
const userRequestObject = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
};

describe('CREATE USER', () => {
  let userToken;
  it('should create a user successfully when valid input are supplied', (done) => {
    chai.request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        userToken = res.body.data[0].token;
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
        expect(res.status).to.equal(409);
        done();
      });
  });
  it('should fail creation when username is already in use', (done) => {
    chai.request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
});
describe('EDIT PROFILE', () => {
  let userToken;
  const url1 = '/api/v1/user';
  const userUpdateObject = {
    username: 'jake@jake.jake',
    bio: 'I like to skateboard',
    imageUrl: 'https://i.stack.imgur.com/xHWG8.jpg',
  };
  it.skip('should update a user profile successfully when valid input are supplied', (done) => {
    chai.request(app)
      .put(url1)
      .set('Authorization', userToken)
      .send(userUpdateObject)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        expect(res.body.message).to.equal('Your profile has been updated succesfully');
        done();
      });
  });
});
