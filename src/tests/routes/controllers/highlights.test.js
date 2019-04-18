import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import {
  loginCredentials,
  anotherHighlight,
  highlightLogin,
} from '../../db/mockdata/userdata';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

let jwtToken, secondjwtToken;

const loginUrl = '/api/v1/auth/login';

const articleId = '0aedc83d-5172-4874-bc43-7826e955fccb';
const falseArticleId = '8ebdfc3c-ffd7-440a-80f3-ab4ebeeb8cae';
const highlightId = '8a4bba55-c5ea-4399-bc08-3524d0d5ba2a';

const urlWithValidArticleId = `/api/v1/articles/${articleId}/highlights`;
const urlWithFalseArticleId = `/api/v1/articles/${falseArticleId}/highlights`;

describe('TEST SUITE FOR HIGHLIGHTS', () => {
  before(async () => {
    try {
      const res = await chai
        .request(app)
        .post(loginUrl)
        .send(loginCredentials);
      jwtToken = res.body.data.token;

      const secondlogin = await chai
        .request(app)
        .post(loginUrl)
        .send(highlightLogin);
      secondjwtToken = secondlogin.body.data.token;
    } catch (error) {
      return error.message;
    }
  });

  describe('Highlight Text', () => {
    it('Should not highlight an article when token does not exist', async () => {
      const response = await chai.request(app).post(urlWithValidArticleId);
      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Please provide a JWT token');
    });

    it('Should not highlight an article when id does not exist', async () => {
      const response = await chai
        .request(app)
        .post(urlWithFalseArticleId)
        .set('Authorization', jwtToken);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('This article does not exist');
    });

    it('should highlight an article with valid inputs', async () => {
      const response = await chai
        .request(app)
        .post(urlWithValidArticleId)
        .set('Authorization', jwtToken)
        .send(anotherHighlight);
      expect(response.status).to.equal(201);
      expect(response.body.data.stopIndex).to.equal(105);
    });

    it('should return an empty array if user has no highlight', async () => {
      const response = await chai
        .request(app)
        .get(urlWithValidArticleId)
        .set('Authorization', secondjwtToken);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('You have no highlights yet!');
    });

    it('Should not get highlights of an article when id does not exist', async () => {
      const response = await chai
        .request(app)
        .post(urlWithFalseArticleId)
        .set('Authorization', jwtToken);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('This article does not exist');
    });

    it("should get all user's highlights in an article", async () => {
      const response = await chai
        .request(app)
        .get(urlWithValidArticleId)
        .set('Authorization', jwtToken);
      expect(response.status).to.equal(200);
      expect(typeof response.body.data).to.equal('object');
    });
  });

  describe('Remove Highlight', () => {
    it('should successfully remove highlight', async () => {
      const response = await chai
        .request(app)
        .delete(`${urlWithValidArticleId}/${highlightId}`)
        .set('Authorization', jwtToken);
      const message = 'You have succesfully removed your highlight';
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(message);
    });

    it('Should not remove a highlight when id does not exist', async () => {
      const response = await chai
        .request(app)
        .post(urlWithFalseArticleId)
        .set('Authorization', jwtToken);
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('This article does not exist');
    });
  });
});
