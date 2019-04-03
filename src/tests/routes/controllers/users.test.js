import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';

chai.use(chaiHttp);
const { expect } = chai;

const usersUrl = '/api/v1/users';
const profileUrl = '/api/v1/profiles/gentlejane';
const nonExistingProfileUrl = '/api/v1/profiles/teddybear';

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
      expect(res.body.data.authorProfile)
        .to.be.an('object')
        .to.have.property('username')
        .to.eql('gentlejane');
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
        xAccessToken = res.body.data;
        done();
      });
  });

  describe('EDIT PROFILE', () => {
    const url = '/api/v1/users/profile/3231983a-b944-4c53-a549-f561f7474428';
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
          done();
        });
    });
  });
  describe('Get a single User', () => {
    it('Should not get a non-existent user', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/profiles/b26edf90-8975-442e-9d3c-4a595073dd7a')
        .set('Authorization', xAccessToken);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal(
        'The userID provided does not exist',
      );
    });

    it('Should get a user with valid userID param', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/users/3231983a-b944-4c53-a549-f561f7474428')
        .set('Authorization', xAccessToken);
      expect(response.status).to.equal(200);
      expect(response.body.data)
        .to.be.an('object')
        .to.have.property('username');
      expect(response.body.message).to.equal('Your requested profile');
    });
  });
});
