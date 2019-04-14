import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import {
  adminCredentials,
  authorCredentials,
} from '../../db/mockdata/userdata';

chai.use(chaiHttp);
const { expect } = chai;
const rolesEndpoint = '/api/v1/roles';
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

      const res = await chai
        .request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);

      adminToken = res.body.data;
    });

    it('should return a 401 when token is not set', async () => {
      const { status, body } = await chai.request(app).get(rolesEndpoint);

      expect(status).to.eql(401);
      expect(body).to.have.key('status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql('Please provide a JWT token');
    });

    it('should return a 400 when token is invalid', async () => {
      const { status, body } = await chai
        .request(app)
        .get(rolesEndpoint)
        .set('x-access-token', 'jwt-token');

      expect(status).to.eql(400);
      expect(body).to.have.key('status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql(
        'Token is invalid, please provide a valid token',
      );
    });

    it('should return a 403 response when an unauthorized user tries to access an admin only route', async () => {
      const { status, body } = await chai
        .request(app)
        .get(rolesEndpoint)
        .set('x-access-token', userToken);

      expect(status).to.be.eql(403);
      expect(body).to.have.key('status', 'message');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql(
        'You are not allowed to perform this action because you are not an Admin',
      );
    });

    it('should return a 200 response when an authorized user accesses a protected route', async () => {
      const { status, body } = await chai
        .request(app)
        .get(rolesEndpoint)
        .set('x-access-token', adminToken);

      expect(status).to.be.eql(200);
      expect(body).to.have.key('status', 'message', 'data');
      expect(body.status).to.eql('success');
      expect(body.message).to.eql('roles fetched successfully');
    });
  });

  describe('roles assignment', () => {
    it('successfully makes an author an admin', async () => {
      const { status, body } = await chai
        .request(app)
        .post(rolesEndpoint)
        .set('x-access-token', adminToken);

      expect(status).to.be.eql(200);
      expect(body).to.have.key('success', 'status', 'message');
      expect(body.status).to.eql('success');
      expect(body.message).to.eql('role updated successfully');
      expect(body.data.role).to.eql('admin');
    });

    it('successfully revokes admin privileges for an admin', async () => {
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
