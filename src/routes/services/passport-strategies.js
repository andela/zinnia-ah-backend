import passport from 'passport';
import dotenv from 'dotenv';
import models from '../../db/models';

dotenv.config();

const { User } = models;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

const credentials = {
  facebook: {
    clientID: process.env.FACEBOOK_APP_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_APP_CALLBACK,
    profileFields: ['id', 'email', 'name'],
  },

  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/api/auth/twitter/callback',
  },
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
        socialProvider: profile.provider,
      },
    });
    return done(null, currentUser);
  } catch (err) {
    return done(err);
  }
};

const twitterAuth = async (token, tokenSecret, profile, done) => {
  try {
    const currentUser = await User.findOrCreate({
      where: { socialId: profile.id },
      defaults: {
        firstName: profile.name,
        username: profile.username,
        email: profile.email,
        socialProvider: profile.provider,
      },
    });
    return done(null, currentUser);
  } catch (err) {
    return done(err);
  }
};

passport.use(new FacebookStrategy(credentials.facebook, facebookAuth));
passport.use(new TwitterStrategy(credentials.twitter, twitterAuth));

export default passport;
