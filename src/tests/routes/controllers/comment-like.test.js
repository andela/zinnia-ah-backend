import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import { loginCommenter } from '../../db/mockdata/userdata';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const loginUrl = '/api/v1/auth/login';
const likeCommentUrl =
  '/api/v1/articles/141f4f05-7d81-4593-ab54-e256c1006210/comments/08fd662d-ed92-419e-8af9-41afd3fb3d87/like';
let token = '';

const userRequestObject = {
  email: 'igbominadeveloper@ah.com',
  password: 'password1',
};

describe('LIKE COMMENT', () => {
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

  it('Should be able to like a comment', async () => {
    const res = await chai
      .request(app)
      .post(likeCommentUrl)
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      });
    console.log(res.body);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('You have liked this post');
  });

  it('Should be able to unlike a comment', async () => {
    const res = await chai
      .request(app)
      .post(likeCommentUrl)
      .set('Accept', 'application/json')
      .set({
        Authorization: token,
      });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('You have unliked this post');
  });
});
