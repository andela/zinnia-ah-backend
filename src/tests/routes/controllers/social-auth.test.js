import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { socialController } from '../../../routes/controllers/auth.controller';
import {
  facebookAuth,
  twitterAuth,
  googleAuth,
} from '../../../routes/services/passport-strategies.services';
import { stat } from 'fs';

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
  describe('Social controller', async () => {
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
      redirectUrl: '',
    };
    const res = {
      redirect(statusCode, url) {
        return { statusCode, url };
      },
    };

    it('should return a successful redirect after authentication', async () => {
      req.user._options.isNewRecord = true;
      req.redirectUrl = 'http://authorshaven.com';
      const response = await socialController(req, res);
      expect(response).to.be.an('object');
      expect(response).to.have.keys('statusCode', 'url');
      expect(response.statusCode).to.eql(301);
      expect(response.url.indexOf(req.redirectUrl)).to.not.be.eql(-1);
    });
  });
});
