import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../server';
import {
  adminCredentials,
  authorCredentials,
} from '../../db/mockdata/userdata';
import { generateToken } from '../../../utils/helpers.utils';

chai.use(chaiHttp);
const { expect } = chai;
const rolesEndpoint = '/api/v1/users/roles';
let userToken = generateToken(authorCredentials);
let adminToken = generateToken(adminCredentials);

describe('Roles and Access control', () => {
  describe('protected routes', () => {
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
    it('successfully changes a user role', async () => {
      const requestBody = {
        role: 'admin',
      };
      const { status, body } = await chai
        .request(app)
        .put(`${rolesEndpoint}/gentlejane`)
        .set('x-access-token', adminToken)
        .send(requestBody);
      expect(status).to.be.eql(200);
      expect(body).to.have.key('status', 'message', 'data');
      expect(body.status).to.eql('success');
      expect(body.message).to.eql('role updated successfully');
    });

    it('return 404 if user does not exist', async () => {
      const requestBody = {
        role: 'admin',
      };
      const { status, body } = await chai
        .request(app)
        .put(`${rolesEndpoint}/karlous`)
        .set('x-access-token', adminToken)
        .send(requestBody);

      expect(status).to.be.eql(404);
      expect(body).to.have.key('status', 'message', 'errors');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql('This user does not exist');
      expect(body.errors).to.eql(true);
    });

    it('return 409 if user is already has that role', async () => {
      const requestBody = {
        role: 'admin',
      };
      const { status, body } = await chai
        .request(app)
        .put(`${rolesEndpoint}/gentlejane`)
        .set('x-access-token', adminToken)
        .send(requestBody);

      expect(status).to.be.eql(409);
      expect(body).to.have.key('status', 'message', 'errors');
      expect(body.status).to.eql('error');
      expect(body.message).to.eql('This user is already an admin');
      expect(body.errors).to.eql(true);
    });
  });
});
