import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';
import sinon from 'sinon';
import { transporter } from '../../../config/mail-config';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;
const endPoint = '/api/v1/articles';

const userRequestObject = {
  username: 'rdxtcfygvubh',
  email: 'lilfgcvhly@gmail.com',
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
describe('Articles', () => {
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
          xAccessToken = res.body.data;
          done();
        });
    });

    it('should create article successfully, with valid user input', done => {
      chai
        .request(app)
        .post(endPoint)
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
        .post(endPoint)
        .set('x-access-token', xAccessToken)
        .send(userRequestObject)
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
    it('should return a 200 response when valid uuid articleID is set', async () => {
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006210';
      const response = await chai.request(app).get(`${endPoint}/${articleID}`);

      expect(response.body).to.include.keys('status', 'message', 'data');
      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.message).to.eql('Article successfully retrieved');
    });

    it('should return a 404 response when article does not exist', async () => {
      const articleID = '141f4f05-7d81-4593-ab54-e256c1006219';
      const response = await chai.request(app).get(`${endPoint}/${articleID}`);

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
});
