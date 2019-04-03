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
let resetToken;
const userEmail = {
  email: 'jsmith@gmail.com',
};

describe('Forgot Password', () => {
  it('should send the user a password reset link via email', (done) => {
    chai.request(app)
      .post('/api/v1/forgot-password')
      .send(userEmail)
      .end((err, res) => {
        resetToken = res.body.token;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should fail if the user email doesnt exist', (done) => {
    userEmail.email = 'nedyudobat@gmail.com';
    chai.request(app)
      .post('/api/v1/forgot-password')
      .send(userEmail)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});

describe('Reset Password', () => {
  it('should return a success and status of 200 if password has been reset', (done) => {
    chai.request(app)
      .patch(`/api/v1/reset-password/${resetToken}`)
      .send('password')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should fail if no token is provided in the request', (done) => {
    chai.request(app)
      .patch('/api/v1/reset-password/')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('should fail if token is invalid in the request', (done) => {
    chai.request(app)
      .patch('/api/v1/reset-password/qwertyuikmnjhdr434567bvfre3rtybvde3rtytrf')
      .send()
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
});
