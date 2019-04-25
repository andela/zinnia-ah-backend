import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import { generateToken } from '../../../utils/helpers.utils';
import {
  userCredentialsForToken,
  secondUserWithExistingUserName,
} from '../../db/mockdata/userdata';
import { SLUGONE } from '../../db/mockdata/articledata';

chai.use(chaiHttp);
const { expect } = chai;

const usersUrl = '/api/v1/users';
const profileUrl = '/api/v1/users/profiles/gentlejane';
const nonExistingProfileUrl = '/api/v1/users/profiles/teddybear';
const { email, id, username } = userCredentialsForToken;
const userToken = generateToken({ email, id });

describe('List Users functionality', () => {
  context('GET all users', () => {
    it('should fetch all authors', async () => {
      const res = await chai.request(app).get(usersUrl);
      expect(res.status).to.equal(200);
      expect(res.body.message)
        .to.be.a('String')
        .to.eql('success');
      expect(res.body.data).to.have.key('authors');
      expect(res.body.data.authors[0])
        .to.be.an('object')
        .to.have.property('email')
        .to.eql('igbominadeveloper@ah.com');
    });
  });

  context('GET user profile', () => {
    it("should return the author's profile", async () => {
      const res = await chai.request(app).get(profileUrl);
      expect(res.status).to.equal(200);
      expect(res.body.message)
        .to.be.a('String')
        .to.eql('Get profile request successful');
      expect(res.body.data).to.be.an('object');
      expect(res.body.data).to.have.property('publications');
      expect(res.body.data).to.have.property('followers');
      expect(res.body.data).to.have.property('followings');
    });
  });

  context('An author does not exist', () => {
    it('should return Author does not exist', async () => {
      const res = await chai.request(app).get(nonExistingProfileUrl);
      expect(res.status).to.equal(404);
      expect(res.body.message)
        .to.be.a('String')
        .to.eql('Author not found');
    });
  });
});

const userRequestObject = {
  username: 'janesmith',
  email: 'jsmith@gmail.com',
  password: 'hhrtuyhgty5t678',
};

const signinUrl = '/api/v1/auth/login';
let xAccessToken = '';

describe('USER PROFILE', () => {
  before(done => {
    chai
      .request(app)
      .post(signinUrl)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        xAccessToken = res.body.data.token;
        done();
      });
  });

  describe('EDIT PROFILE', () => {
    const url = '/api/v1/users/profile/';
    const userUpdateObject = {
      username: 'jake@jake',
      bio: 'I like to skateboard',
      image: 'https://i.stack.imgur.com/xHWG8.jpg',
      firstName: 'jake',
      lastName: 'smith',
    };
    it('should update a user profile successfully when valid input are supplied', done => {
      chai
        .request(app)
        .put(url)
        .set('Authorization', xAccessToken)
        .send(userUpdateObject)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal(
            'Your profile has been updated successfully',
          );
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
    it('Should not allow update if there is invalid token ', async () => {
      const response = await chai
        .request(app)
        .put(url)
        .set('Authorization', 'xAccessToken');
      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal(
        'Token is invalid, please provide a valid token',
      );
    });
    it('Should not allow update if there is no token ', async () => {
      const response = await chai.request(app).put(url);
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Please provide a JWT token');
    });
    it('Should not allow update if username is already taken', async () => {
      const response = await chai
        .request(app)
        .put(url)
        .send(secondUserWithExistingUserName)
        .set('Authorization', xAccessToken);
      expect(response.status).to.equal(409);
      expect(response.body.message).to.equal(
        'Sorry, this username has already been taken',
      );
    });
  });
});

describe('User stats', () => {
  const statsEndpoint = `/api/v1/users/profiles/${username}/stats`;
  const articleEndpoint = `/api/v1/articles/${SLUGONE}`;

  context('authentication', () => {
    it('is only accessible to an authenticated user', async () => {
      const { status, body } = await chai
        .request(app)
        .get(statsEndpoint)
        .set(
          'x-access-token',
          '$2a$10$KZ2MJ8oNY/q8oF8rWt0QruJ6T2ioArE2LnV8R36jzMgW5J0iTlG.S',
        );

      expect(status).to.be.eql(400);
      expect(body).to.have.keys('status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql(
        'Token is invalid, please provide a valid token',
      );
    });
  });

  context('User stats', () => {
    afterEach('trigger article read', async () => {
      await chai
        .request(app)
        .get(articleEndpoint)
        .set('x-access-token', userToken);
    });

    it('initializes the number of articles a user has read to 0', async () => {
      const { status, body } = await chai
        .request(app)
        .get(statsEndpoint)
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.data).to.be.an('object');
      expect(body.message).to.be.eql('reading stats');
      expect(body.data.count).to.be.eql(0);
    });

    it('records the articles a user reads', async () => {
      const { status, body } = await chai
        .request(app)
        .get(statsEndpoint)
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.data).to.be.an('object');
      expect(body.message).to.be.eql('reading stats');
      expect(body.data.count).to.be.eql(1);
    });

    it('correctly increases the reads of a user by 1', async () => {
      const { status, body } = await chai
        .request(app)
        .get(statsEndpoint)
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.data).to.be.an('object');
      expect(body.message).to.be.eql('reading stats');
      expect(body.data.count).to.be.eql(2);
    });
  });

  context('User Reports', () => {
    it('should return a 200 and get articles a user has reported', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/api/v1/users/reports')
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.message).to.eql('Successfully retrieved all reports');
      expect(body.data).to.have.property('articles');
    });
  });

  context('User Bookmarks', () => {
    it('returns a 200 and retrieves all bookmarks', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/api/v1/users/bookmarks')
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.message).to.eql('Successfully retrieved all bookmarks');
      expect(body.data).to.have.property('bookmarks');
    });
  });

  context('User Comments', () => {
    it('should return a 200 and get comments by a user', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/api/v1/users/comments')
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.message).to.eql('Successfully retrieved all comments');
      expect(body.data).to.have.property('comments');
    });
  });

  context('User likes', () => {
    it('returns a 200 and retrieves all articles like by a user', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/api/v1/users/likes?type=articles')
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.message).to.eql(
        'Successfully retrieved all articles liked by user',
      );
      expect(body.data).to.have.property('articles');
    });

    it('returns a 200 and retrieves all comments like by a user', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/api/v1/users/likes?type=comments')
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.message).to.eql(
        'Successfully retrieved all comments liked by user',
      );
      expect(body.data).to.have.property('comments');
    });

    it('returns a 200 and retrieves all likes by a user', async () => {
      const { status, body } = await chai
        .request(app)
        .get('/api/v1/users/likes')
        .set('x-access-token', userToken);

      expect(status).to.eql(200);
      expect(body).to.have.keys('status', 'message', 'data');
      expect(body.message).to.eql('Successfully retrieved all likes by user');
      expect(body.data).to.have.property('articles');
      expect(body.data).to.have.property('comments');
    });
  });
});
