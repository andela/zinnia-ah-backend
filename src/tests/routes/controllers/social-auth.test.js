import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { socialController } from '../../../routes/controllers/auth.controller';
import {
  facebookAuth,
  twitterAuth,
  googleAuth,
} from '../../../routes/services/passport-strategies.services';

chai.use(chaiHttp);

describe('Social authentication', () => {
  let facebookTestUser;
  let twitterTestUser;
  let googleTestUser;
  describe('Passport strategies setup', () => {
    const accessToken = '',
      refreshToken = '',
      token = '',
      tokenSecret = '',
      done = (err, data = null) => {
        if (data) {
          return data;
        }
      };

    const name = {
      givenName: 'Uncle',
      familyName: 'Musonant',
    };
    it('Facebook authentication should be successful', async () => {
      const profile = {
        id: 'demoFbSocialId',
        name,
        emails: [{ value: 'testMail.fb.com' }],
        username: 'testFbUsername',
        provider: 'facebook',
      };
      facebookTestUser = await facebookAuth(
        accessToken,
        refreshToken,
        profile,
        done,
      );
      expect(facebookTestUser.dataValues.id).to.be.a('string');
      expect(facebookTestUser.dataValues.lastName).to.eql('Musonant');
      expect(facebookTestUser.dataValues.email).to.eql('testMail.fb.com');
      expect(facebookTestUser.dataValues.username).to.eql('testMail.fb.com');
    });
    it('Twitter authentication should be successful', async () => {
      const profile = {
        id: 'demoTwSocialId',
        name,
        emails: [{ value: 'testMail.tw.com' }],
        username: 'testTwUsername',
        provider: 'twitter',
      };
      twitterTestUser = await twitterAuth(token, tokenSecret, profile, done);
      expect(twitterTestUser.dataValues.id).to.be.a('string');
      expect(twitterTestUser.dataValues.email).to.eql('testMail.tw.com');
      expect(twitterTestUser.dataValues.username).to.eql('testMail.tw.com');
    });
    it('Google authentication should be successful', async () => {
      const profile = {
        id: 'demoGlSocialId',
        name,
        emails: [{ value: 'testMail.gl.com' }],
        username: 'testGlUsername',
        provider: 'google',
      };
      googleTestUser = await googleAuth(
        accessToken,
        refreshToken,
        profile,
        done,
      );
      expect(googleTestUser.dataValues.id).to.be.a('string');
      expect(googleTestUser.dataValues.lastName).to.eql('Musonant');
      expect(googleTestUser.dataValues.email).to.eql('testMail.gl.com');
      expect(googleTestUser.dataValues.username).to.eql('testMail.gl.com');
    });
  });
  describe('Social controller should process user received from passport authentication', async () => {
    let req = {
      user: {
        dataValues: {
          firstName: 'Musonant',
          username: 'mrmusonant@gmail.com',
          email: 'mrmusonant@gmail.com',
          socialProvider: 'twitter',
          socialId: '892165240644829185',
          id: '3505d530-a60f-4fc2-840a-ca9e864b3f33',
          lastName: null,
          password: null,
          bio: null,
          interests: null,
          role: 'AUTHOR',
          image: null,
          isEmailVerified: true,
          createdAt: '2019-04-24T13:02:34.828Z',
          updatedAt: '2019-04-24T13:02:34.828Z',
        },
        _options: {
          isNewRecord: true,
        },
      },
    };
    const res = {
      status(code) {
        res.statusCode = code;
        return res;
      },
      json(data) {
        return { body: data, status: res.statusCode };
      },
    };

    it('and return the appropriate response for a new user', async () => {
      req.user._options.isNewRecord = true;
      const response = await socialController(req, res);
      console.log(response);
      expect(response.status).to.eql(201);
      expect(response.body.data.token).to.be.a('string');
    });

    it('and return the appropriate response for an existing user', async () => {
      req.user._options.isNewRecord = false;
      const response = await socialController(req, res);

      expect(response.status).to.eql(200);
      expect(response.body.status).to.eql('success');
      expect(response.body.data.user).to.be.an('object');
      expect(response.body.data.user.firstName).to.eql(
        req.user.dataValues.firstName,
      );
      expect(response.body.data.token).to.be.a('string');
    });
  });
});
