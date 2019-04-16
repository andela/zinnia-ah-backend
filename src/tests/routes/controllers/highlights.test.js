import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

let xAccessToken, secondXAccessToken, url, articleSlug, highlightId;

describe('TEST SUITE FOR HIGHLIGHTS', () => {
  before(async () => {
    const userRequestObject = {
      username: 'igbominadeveloper',
      email: 'igbominadeveloper@ah.com',
      password: 'favourafolayan',
    };

    const secondUserRequestObject = {
      username: 'janesmith',
      email: 'jsmith@gmail.com',
      password: 'hhrtuyhgty5t678',
    };

    const articleRequestObject = {
      id: '1368d750-af4b-4242-80f4-9bd7bab8865e',
      user_id: '5a6fab9c-5849-4be5-973c-5a371165cd57',
      title: 'Hello Article 6',
      slug: 'Hello-Article-6-0af689c8-c0dc-4d19-bd33-7faf73a36e98',
      description: 'Description goes here',
      body: 'Another Body',
    };

    const highlightObject = {
      highlightedText: 'it was at that moment I knew who he was',
      startIndex: '72',
      stopIndex: '105',
      comment: 'I love how it was well put',
    };

    const firstUserResponseObject = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userRequestObject);
    xAccessToken = firstUserResponseObject.body.data.token;

    const secondUserResponseObject = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(secondUserRequestObject);
    secondXAccessToken = secondUserResponseObject.body.data.token;

    const articleResponse = await chai
      .request(app)
      .post('/api/v1/articles')
      .send(articleRequestObject)
      .set('Authorization', xAccessToken);
    articleSlug = articleResponse.body.data.slug;

    url = `/api/v1/articles/${articleSlug}/highlights`;

    const highlightResponse = await chai
      .request(app)
      .post(`${url}`)
      .set('Authorization', xAccessToken)
      .send(highlightObject);
    highlightId = highlightResponse.body.data.id;
  });

  describe('Highlight Text', () => {
    it('Should not highlight an article when token does not exist', async () => {
      const response = await chai
        .request(app)
        .post('/api/v1/articles/non-existent-slug/highlights');
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Please provide a JWT token');
    });

    it('should highlight an article with valid inputs', async () => {
      const highlightObject = {
        highlightedText: 'Something to think about',
        startIndex: '2',
        stopIndex: '18',
        comment: 'This pushed me to the edge.',
      };
      const response = await chai
        .request(app)
        .post(`${url}`)
        .set('Authorization', xAccessToken)
        .send(highlightObject);
      expect(response.status).to.equal(201);
      expect(response.body.data.stopIndex).to.equal(18);
    });

    it('should not return an empty array if user has no highlight', async () => {
      const response = await chai
        .request(app)
        .get(`${url}`)
        .set('Authorization', secondXAccessToken);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('You have no highlights yet!');
    });

    it("should get all user's highlights in an article", async () => {
      const response = await chai
        .request(app)
        .get(`${url}`)
        .set('Authorization', xAccessToken);
      expect(response.status).to.equal(200);
      expect(typeof response.body.data).to.equal('object');
    });
  });

  describe('Remove Highlight', () => {
    it('should successfully remove highlight', async () => {
      const response = await chai
        .request(app)
        .delete(`${url}/${highlightId}`)
        .set('Authorization', xAccessToken);
      const message = 'You have succesfully removed your highlight';
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(message);
    });
  });
});
