import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import app from '../../../server';
import { transporter } from '../../../config/mail-config';
import {
  loginCredentials,
  existingUser,
  articleSlug,
} from '../../db/mockdata/userdata';
import { generateToken } from '../../../utils/helpers.utils';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const articleRequestObject = {
  title: 'the hope of life',
  description: 'in times of trouble, where do we find hope',
  body:
    'when our peace is no more, when friends are no where to be found. we need to do back to our source.',
  images: 'image1.jpg, image2.png',
  tags: 'hope, life, source.',
};

const likeArticleUrl =
  '/api/v1/articles/4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f/like';
const unlikeArticleUrl =
  '/api/v1/articles/4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f/unlike';
const bookmarkUrl =
  '/api/v1/articles/4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f/bookmark';
const removeBookmarkUrl =
  '/api/v1/articles/4ea984b7-c450-4fe3-8c3e-4e3e8c308e5f/removebookmark';
const loginUrl = '/api/v1/auth/login';
let jwtToken = '';
const endPoint = '/api/v1/articles';
const xAccessToken = generateToken(existingUser);
const falseToken = generateToken({ id: 'fake' });
let articleId = '';

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
        .get(`${endPoint}/slug/${articleSlug}`);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.message).to.eql('Article successfully retrieved');
    });

    it('should return a 200 response when valid uuid articleID is set', async () => {
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006210';
      const response = await chai.request(app).get(`${endPoint}/${articleID}`);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.message).to.eql('Article successfully retrieved');
    });

    it('should return a 404 response when article does not exist', async () => {
      const response = await chai
        .request(app)
        .get(`${endPoint}/slug/${articleSlug}-hhgh6`);

      expect(response.body).to.include.keys('status', 'message');
      expect(response.status).to.eql(404);
      expect(response.body.status).to.eql('error');
      expect(response.body.message).to.eql('Article does not exist');
    });

    it('should return a 422 response when articleID is not valid UUID', async () => {
      const articleID = '141f4f05-7d81-4593-e256c1006219';
      const response = await chai.request(app).get(`${endPoint}/${articleID}`);

      expect(response.body).to.include.keys('status', 'message', 'errors');
      expect(response.status).to.eql(422);
      expect(response.body.status).to.eql('error');
      expect(response.body.message).to.eql('validation error');
      expect(response.body.errors[0]).to.eql('articleId must be a valid GUID');
    });
  });

  describe('GET /api/v1/articles', () => {
    it('should return a 200 response when articles exist', async () => {
      const response = await chai.request(app).get(endPoint);
      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.message).to.eql('Articles successfully retrieved');
      expect(response.body.data.rows.length).to.be.greaterThan(0);
    });

    it('should return 10 articles when limit is set to 10', async () => {
      const limit = 10;
      const response = await chai
        .request(app)
        .get(endPoint)
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
        .get(endPoint)
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
    it('should create article successfully, with valid user input', done => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', xAccessToken)
        .send(articleRequestObject)
        .end((err, res) => {
          expect(res.status).to.eql(201);
          expect(res.body.status).to.eql('success');
          expect(res.body.message).to.eql(
            'your article has been created successfully',
          );
          articleId = res.body.data.id;
          done();
        });
    });

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
        .post(`${endPoint}/${articleID}/share`)
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
        .post(`${endPoint}/${articleID}/report`)
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
        .post(`${endPoint}/${articleID}/report`)
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
        .post(`${endPoint}/${articleID}/report`)
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
