import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const userRequestObject = {
  username: 'janahimmmm',
  email: 'nedy@gmail.com',
  password: 'hhrtuyhgty5t678',
};
let authToken;
const confirmationUrl = '/api/v1/auth/users/confirmation';

describe('FOLLOW USER', () => {
  before(async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(userRequestObject);
    authToken = res.body.data.token;
    await chai.request(app).get(`${confirmationUrl}/${authToken}`);
  });

  it('should follow a user', done => {
    chai
      .request(app)
      .post('/api/v1/profiles/janesmith/follow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should fail if a user tries to follow him/herself', done => {
    chai
      .request(app)
      .post('/api/v1/profiles/janahimmmm/follow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('You cannot follow yourself');
        done();
      });
  });

  it('should fail if a user tries to follow someone twice', done => {
    chai
      .request(app)
      .post('/api/v1/profiles/janesmith/follow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.errors).to.equal(
          'You are already following this person',
        );
        done();
      });
  });

  it('should unfollow a user', done => {
    chai
      .request(app)
      .delete('/api/v1/profiles/janesmith/unfollow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should fail if a user tries to unfollow him/herself', done => {
    chai
      .request(app)
      .delete('/api/v1/profiles/janahimmmm/unfollow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('You cannot unfollow yourself');
        done();
      });
  });

  it('should fail if a user tries to unfollow someone twice', done => {
    chai
      .request(app)
      .delete('/api/v1/profiles/janesmith/unfollow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.errors).to.equal('You are not following this person');
        done();
      });
  });
});
