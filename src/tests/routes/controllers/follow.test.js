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

const userRequestObject = {
  username: 'janahimmmm',
  email: 'nedy@gmail.com',
  password: 'hhrtuyhgty5t678',
};
let authToken;
describe('FOLLOW USER', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/v1/users')
      .send(userRequestObject)
      .end((err, res) => {
        authToken = res.body.data.token;
        done();
      });
  });

  it('should follow a user', done => {
    chai
      .request(app)
      .post('/api/v1/profiles/janesmith/follow')
      .set('authorization', authToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
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
        expect(res.status).to.equal(201);
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
