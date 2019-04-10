import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

let token = '';
const userRequestObject = {
  email: 'igbominadeveloper@ah.com',
  password: 'favourafolayan',
};

describe('CREATE COMMENT', () => {
  it('login user to get token', done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userRequestObject)
      .end((err, res) => {
        token = res.body.data.token;
        done();
      });
  });

  it('User should be able to create a comment', done => {
    chai
      .request(app)
      .post('/api/v1/articles/0aedc83d-5172-4874-bc43-7826e955fccb/comments')
      .send({
        comment: 'Legit comment',
      })
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Comment has been created');
        expect(res.body.data.comment.body).to.equal('Legit comment');
        expect(res.body).to.be.an('object');
        expect(res.body.data.comment.author).to.be.an('object');
        expect(res.body).to.not.be.an('array');
        done();
      });
  });

  it('should send an error if article does not exist', done => {
    chai
      .request(app)
      .post('/api/v1/articles/0aedc83d-5172-5874-bc43-7826e945fccb/comments')
      .send({
        comment: 'Legit comment',
      })
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This article does not exist');
        done();
      });
  });

  it('should create a threaded comment', done => {
    chai
      .request(app)
      .post(
        '/api/v1/articles/cd75c9de-324e-4b7e-be68-64c0ce09bd4d/comments/08fd662d-ed92-419e-8af9-41afd3fb3d87/thread',
      )
      .send({
        threadedComment: 'Legit thread comment',
      })
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal(
          'You have commented under this thread',
        );
        done();
      });
  });

  it('should not be able to create a threaded comment if article does not exist', done => {
    chai
      .request(app)
      .post(
        '/api/v1/articles/cd75c1de-324e-4b7e-be68-64c0ce09bd4d/comments/08fd662d-ed92-429e-8af9-41afd3fb3d87/thread',
      )
      .send({
        threadedComment: 'Legit thread comment',
      })
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This article does not exist');
        done();
      });
  });

  it('should not be able to create a threaded comment if the parent comment does not exist', done => {
    chai
      .request(app)
      .post(
        '/api/v1/articles/cd75c9de-324e-4b7e-be68-64c0ce09bd4d/comments/18fd662d-ed92-419e-8af9-41afd3fb3d87/thread',
      )
      .send({
        threadedComment: 'Legit thread comment',
      })
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('This comment does not exist');
        done();
      });
  });
});
