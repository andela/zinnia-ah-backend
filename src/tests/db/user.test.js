import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import sinon from 'sinon';
import { transporter } from '../../config/mailConfig';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;
const url = '/api/v1/users';
const confirmationUrl = '/api/v1/users/confirmation';
const userRequestObject = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
};

let mockSendMail;
describe('CREATE USER', () => {
  before(() => {
    mockSendMail = sinon.stub(transporter, 'sendMail');
  });

  let userToken;
  it('should create a user successfully when valid input are supplied', done => {
    chai
      .request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        userToken = res.body.data[0].token;
        done();
      });
  });
  it('should confirm a user', done => {
    chai
      .request(app)
      .get(`${confirmationUrl}/${userToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should fail creation when email is already in use', done => {
    chai
      .request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
  it('should fail creation when username is already in use', done => {
    chai
      .request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });
});
