import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../server';

chai.use(chaiHttp);
const { expect } = chai;
const endPoint = '/api/v1/articles';

describe('Articles', () => {
  describe('GET /api/v1/articles', () => {
    it('should return a 404 response when article array is empty', async () => {
      const response = await chai.request(app)
        .get(endPoint);

      expect(response.body).to.include.keys('status', 'message');
      expect(response.status).to.eql(404);
      expect(response.body.status).to.eql('error');
      expect(response.body.message).to.eql('resource not found');
    });
  });
});
