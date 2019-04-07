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

const userRequestObject = {
  username: 'janahimmmm',
  email: 'nedy@gmail.com',
  password: 'hhrtuyhgty5t678',
};


describe('FOLLOW USER', () => {
  it('should create a user successfully when valid input are supplied', (done) => {
    chai.request(app)
      .post(url)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should follow a user', (done) => {
    chai.request(app)
      .post('/api/v1/profiles/janesmith/follow/2')
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('success');
        done();
      });
  });

  it('should fail if a user tries to follow him/herself', (done) => {
    chai.request(app)
      .post('/api/v1/profiles/janesmith/follow/1')
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('You cannot follow yourself');
        done();
      });
  });

  it('should unfollow a user', (done) => {
    chai.request(app)
      .delete('/api/v1/profiles/janesmith/unfollow/2')
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('success');
        done();
      });
  });

  it('should fail if a user tries to unfollow him/herself', (done) => {
    chai.request(app)
      .delete('/api/v1/profiles/janesmith/unfollow/1')
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('You cannot unfollow yourself');
        done();
      });
  });
});
