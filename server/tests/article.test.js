import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

// configure chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

describe('Articles', () => {
    describe('GET /api/v1/articles', () => {
        it('returns a 404 error', async () => {
            const response = await chai.request(app)
                .get('/api/v1/articles');
            expect(response.body).to.have.status(404);
            expect(response.body).to.have.key('errors');
            expect(response.body.errors).to.have.key('body');
            expect(response.body.errors.body).to.not.be.empty();
            expect(response.body.errors.body).to.be.an('array');
        });
    });
});
