import passport from 'passport';
import dotenv from 'dotenv';
import models from '../../db/models';

dotenv.config();

const { User } = models;
const FacebookStrategy = require('passport-facebook').Strategy;

const credentials = {
  facebook: {
    clientID: process.env.FACEBOOK_APP_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
    profileFields: ['id', 'email', 'name'],
  }
};

const facebookAuth = async (accessToken, refreshToken, profile, done) => {
  try {
    const currentUser = await User.findOrCreate({
      where: { socialId: profile.id },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        username: profile.emails[0].value,
        email: profile.emails[0].value,
        socialProvider: profile.provider
      }
    });
    return done(null, currentUser);
  } catch (err) {
    return done(err);
  }
};

passport.use(new FacebookStrategy(credentials.facebook, facebookAuth));


export default passport;
