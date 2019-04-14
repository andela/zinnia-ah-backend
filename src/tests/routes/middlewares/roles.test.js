import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import {
  adminCredentials,
  authorCredentials,
} from '../../db/mockdata/userdata';

chai.use(chaiHttp);
const { expect } = chai;
const rolesEndpoint = '/api/v1/users/roles';
let userToken;
let adminToken;

describe.only('Roles and Access control', () => {
  describe('protected routes', () => {
    before(async () => {
      const { body } = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(authorCredentials);

      userToken = body.data;
    });

    it('should return a 401 when token is not set', async () => {
      const { status, body } = await chai.request(app).get(rolesEndpoint);

      expect(status).to.be.eql(401);
      expect(body).to.have.key('errors', 'status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql('Unauthorized access');
    });

    it('should return a 401 when token is invalid', async () => {
      const { status, body } = await chai
        .request(app)
        .post(rolesEndpoint)
        .set('x-access-token', 'jwt-token');

      expect(status).to.be.eql(401);
      expect(body).to.have.key('errors', 'status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql('Unauthorized access');
    });

    it('should return a 403 response when an unauthorized user tries to access an admin only route', async () => {
      const { status, body } = await chai
        .request(app)
        .post(rolesEndpoint)
        .set('x-acess-token', userToken);

      expect(status).to.be.eql(403);
      expect(body).to.have.key('errors', 'status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql(
        'Your credentials do not allow access to this resource',
      );
    });
  });
  describe('roles assignment', () => {
    before(async () => {
      const { body } = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);

      adminToken = body.data;
    });

    it('should return a 200 response and an array of user roles when request user is an admin', async () => {
      const { status, body } = await chai
        .request(app)
        .get(rolesEndpoint)
        .set('x-access-token', adminToken);

      expect(status).to.be.eql(200);
      expect(body).to.have.key('data', 'status', 'message');
      expect(body.status).to.eql('success');
      expect(body.data.length).to.be.greaterThan(0);
    });

    it('successfully makes a user an admin', async () => {
      const { status, body } = await chai
        .request(app)
        .post(rolesEndpoint)
        .set('x-access-token', adminToken);

      expect(status).to.be.eql(200);
      expect(body).to.have.key('success', 'status', 'message');
      expect(body.status).to.eql('success');
      expect(body.message).to.eql('role updated successfully');
      expect(body.data.role).to.eql('administrator');
    });

    it('successfully revokes admin privileges for a user', async () => {
      const { status, body } = await chai
        .request(app)
        .post(rolesEndpoint)
        .set('x-access-token', adminToken);

      expect(status).to.be.eql(200);
      expect(body).to.have.key('success', 'status', 'message');
      expect(body.status).to.eql('success');
      expect(body.message).to.eql('role updated successfully');
      expect(body.data.role).to.eql('author');
    });
  });
});
