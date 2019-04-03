import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../../../db/models';
import app from '../../../server';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

before(async () => {
  await models.sequelize.sync({ force: true });
});

describe('FOLLOW USER', () => {
  it('should follow a user', (done) => {
    chai.request(app)
      .post('api/v1/profiles/janesmith/follow/1')
      .send(userRequestObject)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
});
