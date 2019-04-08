import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

chai.use(chaiHttp);
const { expect } = chai;
const endPoint = '/api/v1/articles';

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
