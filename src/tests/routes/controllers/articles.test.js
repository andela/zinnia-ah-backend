import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import rewire from 'rewire';

import app from '../../../server';
import models from '../../../db/models';
import { transporter } from '../../../config/mail-config';
import {
  loginCredentials,
  existingUser,
  articleSlug,
} from '../../db/mockdata/userdata';
import { articleRequestObject } from '../../db/mockdata/articledata';
import {
  likeArticleUrl,
  unlikeArticleUrl,
  bookmarkUrl,
  removeBookmarkUrl,
  rateArticleUrl,
  rateNotFoundArticleUrl,
  loginUrl,
  articleEndpoint,
} from '../../db/mockdata/urldata';
import { generateToken } from '../../../utils/helpers.utils';

const { User, Article } = models;

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

let articles;

const rating = 4;

let jwtToken = generateToken(existingUser);
const endPoint = '/api/v1/articles';
const xAccessToken = generateToken(existingUser);
const falseToken = generateToken({ id: 'fake' });
let articleId = '4ec884b7-c450-4fe3-9db2-4e3e8c308e5f';

describe('Articles', () => {
  before(async () => {
    const res = await chai
      .request(app)
      .post(loginUrl)
      .send(loginCredentials);
    jwtToken = res.body.data.token;
  });

  describe('CREATE ARTICLE', () => {
    before(() => {
      // mocking sendMail
      sinon.stub(transporter, 'sendMail');
    });

    it('should fail when token is invalid or not supplied', done => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .send(articleRequestObject)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('jwt must be provided');
          done();
        });
    });

    it('should create article successfully, with valid user input', done => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', jwtToken)
        .send(articleRequestObject)
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });

    it('should respond with 415 when tags is not created', done => {
      articleRequestObject.tags = 'string tagged';
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', jwtToken)
        .send(articleRequestObject)
        .end((err, res) => {
          expect(res.status).to.eql(415);
          expect(res.body.message).to.eql(
            'tags should be an array, string provided',
          );
          done();
        });
    });

    it('should fail when all fields are not supplied', done => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', jwtToken)
        .send(loginCredentials)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.message).to.equal(
            'invalid/empty input. all fields must be specified.',
          );
          done();
        });
    });
  });

  describe('GET /api/v1/articles', () => {
    it('should return a 200 response when valid article slug is set', async () => {
      const response = await chai
        .request(app)
        .get(`${articleEndpoint}/${articleSlug}`);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
    });

    it('should return a 200 response when valid uuid articleID is set', async () => {
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006210';
      const response = await chai
        .request(app)
        .get(`${articleEndpoint}/${articleID}`);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
    });

    it('should return a 404 response when article does not exist', async () => {
      const response = await chai
        .request(app)
        .get(`${articleEndpoint}/${articleSlug}-hhgh6`);

      expect(response.body).to.include.keys('status', 'message');
      expect(response.status).to.eql(404);
      expect(response.body.status).to.eql('error');
      expect(response.body.message).to.eql('Article does not exist');
    });
  });

  describe('GET /api/v1/articles', () => {
    it('should return a 200 response when articles exist', async () => {
      const response = await chai.request(app).get(articleEndpoint);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.data.rows.length).to.be.greaterThan(0);
    });

    it('should return 10 articles when limit is set to 10', async () => {
      const limit = 10;
      const response = await chai
        .request(app)
        .get(articleEndpoint)
        .query({ limit });
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.data.rows.length).to.eql(limit);
    });

    it('should return 20 articles when limit is set to 20', async () => {
      const limit = 20;
      const response = await chai
        .request(app)
        .get(articleEndpoint)
        .query({ limit });
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.data.rows.length).to.eql(limit);
    });
  });

  describe('Like and Unlike Articles', () => {
    context('User can like article', () => {
      it('should allow authenticated users like an article', async () => {
        const res = await chai
          .request(app)
          .post(likeArticleUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(200);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('Article has been liked');
        expect(res.body.data)
          .to.be.an('object')
          .to.have.property('userData');
        expect(res.body.data.userData.likes).to.deep.include({
          title: 'Test Article for likes and unlikes',
          id: '4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
          slug: 'Hello-Article-31-4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
        });
      });
    });

    context('User can unlike article', () => {
      it('should allow authenticated users unlike an article', async () => {
        const res = await chai
          .request(app)
          .post(unlikeArticleUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(200);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('unlike article successful');
        expect(res.body.data)
          .to.be.an('object')
          .to.have.property('userData');
        expect(res.body.data.userData.likes)
          .to.be.an('array')
          .to.have.lengthOf(0);
      });
    });
  });

  describe('Delete Article', () => {
    it('should fail when id is invalid', done => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${articleId}ss`)
        .set('Authorization', xAccessToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('article does not exist');
          done();
        });
    });

    it('should fail when userid does not match articles users id', done => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${articleId}`)
        .set('Authorization', falseToken)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal(
            'you are not authorized to perform this action',
          );
          done();
        });
    });

    it('should delete article successfully, with valid user input', done => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${articleId}`)
        .set('Authorization', xAccessToken)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.equal(
            'article as been deleted successfully',
          );
          done();
        });
    });
  });

  describe('SHARE ARTICLES /api/v1/articles/:articleId/share', () => {
    it('should return a 200 response when the article exists', async () => {
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006210';
      const body = {
        email: 'sanjose@ah.com',
      };

      const response = await chai
        .request(app)
        .post(`${articleEndpoint}/${articleID}/share`)
        .send(body);
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql(
        'Article has been successfully shared',
      );
      expect(response.body.data).to.be.an('object');
    });
  });

  describe('POST /api/v1/articles/:articleId/report', () => {
    it('should return a 200 response when an article is reported', async () => {
      const report = {
        reportType: 'plagiarism',
        content: 'qwertytrew',
      };
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006210';
      const response = await chai
        .request(app)
        .post(`${articleEndpoint}/${articleID}/report`)
        .set('authorization', jwtToken)
        .send(report);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.message).to.eql('Article has been reported');
    });

    it('should return a 404 response when an article does not exist', async () => {
      const report = {
        reportType: 'plagiarism',
        content: 'non existent',
      };
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006410';
      const response = await chai
        .request(app)
        .post(`${articleEndpoint}/${articleID}/report`)
        .set('authorization', jwtToken)
        .send(report);
      expect(response.body).to.include.keys('status', 'message', 'errors');
      expect(response.status).to.eql(404);
      expect(response.body.status).to.eql('error');
      expect(response.body.message).to.eql('Article does not exist');
      expect(response.body.errors).to.eql(true);
    });

    it('should return a 400 response if a report type does not exist', async () => {
      const report = {
        reportType: 'plagiarismm',
        content: 'wrong reporttype',
      };
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006210';
      const response = await chai
        .request(app)
        .post(`${articleEndpoint}/${articleID}/report`)
        .set('authorization', jwtToken)
        .send(report);
      expect(response.body).to.include.keys('status', 'message', 'errors');
      expect(response.status).to.eql(400);
      expect(response.body.status).to.eql('error');
      expect(response.body.message).to.eql(
        `${
          report.reportType
        } is not a report type, Please kindly choose "Other" if your category is not listed`,
      );
      expect(response.body.errors).to.eql(true);
    });
  });

  describe('Rate Articles', () => {
    context('User can rate article', () => {
      it('should allow authenticated users rate an article', async () => {
        const res = await chai
          .request(app)
          .post(rateArticleUrl)
          .set('x-access-token', jwtToken)
          .send({
            rating,
          });
        expect(res.status).to.equal(200);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('Your rating has been recorded');
        expect(res.body.data)
          .to.be.an('object')
          .to.have.property('averageRating');
        expect(res.body.data.averageRating).to.eql(4);
      });

      it('should update rating when the record already exists but is different', async () => {
        const res = await chai
          .request(app)
          .post(rateArticleUrl)
          .set('x-access-token', jwtToken)
          .send({
            rating: 2,
          });
        expect(res.status).to.equal(200);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('Your rating has been recorded');
        expect(res.body.data)
          .to.be.an('object')
          .to.have.property('averageRating');
        expect(res.body.data.averageRating).to.eql(2);
      });
    });

    context('Article not found to be rated', () => {
      it('should throw an error that article is not found', async () => {
        const res = await chai
          .request(app)
          .post(rateNotFoundArticleUrl)
          .set('x-access-token', jwtToken)
          .send({
            rating,
          });
        expect(res.status).to.equal(404);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('This article was not found');
      });
    });

    context('Private function calculate average rating', () => {
      const numberArray = [
        { rating: 2, extra: 4, colour: 5, engage: 2, toppings: 1 },
        { toppings: 4, rating: 6 },
      ];
      let calcAverageRating;

      beforeEach(() => {
        articles = rewire('../../../routes/controllers/articles.controller');
        calcAverageRating = articles.__get__('calcAverageRating');
      });

      it('should calculate the average rating', async () => {
        let result = calcAverageRating(numberArray);
        expect(result).to.eql(4);

        articles = rewire('../../../routes/controllers/articles.controller');
      });
    });
  });

  describe('Bookmark and un-bookmark Articles', () => {
    context('User can bookmark an article', () => {
      it('should allow authenticated users bookmark an article', async () => {
        const res = await chai
          .request(app)
          .post(bookmarkUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(200);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('Article successfully bookmarked');
        expect(res.body.data)
          .to.be.an('object')
          .to.have.property('userData');
        expect(res.body.data.userData.bookmarks).to.deep.include({
          title: 'Test Article for likes and unlikes',
          id: '4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
          slug: 'Hello-Article-31-4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f',
        });
      });
    });

    context('User can remove bookmark', () => {
      it('should allow authenticated users to remove bookmark', async () => {
        const res = await chai
          .request(app)
          .post(removeBookmarkUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(200);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql('Bookmark successfully removed');
        expect(res.body.data)
          .to.be.an('object')
          .to.have.property('userData');
        expect(res.body.data.userData.bookmarks)
          .to.be.an('array')
          .to.have.lengthOf(0);
      });
    });
  });

  describe('Server failure', () => {
    const errorMessage =
      'Your request could not be processed at this time. Kindly try again later.';
    const serverError = new Error(errorMessage);
    let serverStub;
    let articleStub;
    beforeEach(() => {
      serverStub = sinon.stub(User, 'findByPk');
      serverStub.throws(serverError);
    });

    afterEach(() => {
      serverStub.restore();
    });

    context('likeAnArticle server failure', () => {
      it('should return a 500 when the server does not process the request', async () => {
        const res = await chai
          .request(app)
          .post(likeArticleUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(500);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql(errorMessage);
      });
    });

    context('unlikeArticle server failure', () => {
      it('should return a 500 when the server does not process the request', async () => {
        const res = await chai
          .request(app)
          .post(unlikeArticleUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(500);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql(errorMessage);
      });
    });

    context('rate server failure', () => {
      it('should return a 500 when the server does not process the request', async () => {
        articleStub = sinon.stub(Article, 'findByPk');
        articleStub.throws(serverError);
        const res = await chai
          .request(app)
          .post(rateArticleUrl)
          .set('x-access-token', jwtToken)
          .send({
            rating,
          });
        expect(res.status).to.equal(500);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql(errorMessage);
        articleStub.restore();
      });
    });

    context('bookmark server failure', () => {
      it('should return a 500 when the server does not process the request', async () => {
        const res = await chai
          .request(app)
          .post(bookmarkUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(500);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql(errorMessage);
      });
    });

    context('remove bookmark server failure', () => {
      it('should return a 500 when the server does not process the request', async () => {
        const res = await chai
          .request(app)
          .post(removeBookmarkUrl)
          .set('x-access-token', jwtToken);
        expect(res.status).to.equal(500);
        expect(res.body.message)
          .to.be.a('String')
          .to.eql(errorMessage);
      });
    });
  });
});
