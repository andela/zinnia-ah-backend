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
