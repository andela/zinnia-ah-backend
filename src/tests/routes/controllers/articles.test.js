import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import sinon from 'sinon';
import { transporter } from '../../../config/mail-config';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

const userRequestObject = {
  username: 'boxunivers',
  email: 'lilly@gmail.com',
  password: 'hhrtuyhgty5t678',
};
const articleRequestObject = {
  title: 'the hope of life',
  description: 'in times of trouble, where do we find hope',
  body:
    'when our peace is no more, when friends are no where to be found. we need to do back to our source.',
  images: 'image1.jpg, image2.png',
  tags: 'hope, life, source.',
};

const signupUrl = '/api/v1/auth/signup';
let xAccessToken = '';

describe('CREATE ARTICLE', () => {
  before(() => {
    let mockSendMail = sinon.stub(transporter, 'sendMail');
  });

  it('should create user, to enable us use jwt token', done => {
    chai
      .request(app)
      .post(signupUrl)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        xAccessToken = res.body.data.token;
        done();
      });
  });

  it('should fail when token is invalid or not supplied', done => {
    chai
      .request(app)
      .post('/api/v1/article')
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
      .post('/api/v1/article')
      .set('x-access-token', xAccessToken)
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
      .post('/api/v1/article')
      .set('x-access-token', xAccessToken)
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal(
          'invalid/empty input. all fields must be specified.',
        );
        done();
      });
describe('Articles', () => {
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
});
