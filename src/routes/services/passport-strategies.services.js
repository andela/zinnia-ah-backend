import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import models from '../../db/models';

dotenv.config();

const { User } = models;

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
    callbackURL: process.env.TWITTER_APP_CALLBACK,
    includeEmail: true,
    profileFields: ['id', 'email', 'name'],
  },

  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_APP_CALLBACK,
  },
};

export const facebookAuth = async (
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  try {
    const [currentUser] = await User.findOrCreate({
      where: { socialId: profile.id, socialProvider: 'facebook' },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        username: profile.emails[0].value,
        email: profile.emails[0].value,
        socialProvider: profile.provider,
        isEmailVerified: true,
      },
    });
    return done(null, currentUser);
  } catch (err) {
    return done(err);
  }
};

export const twitterAuth = async (token, tokenSecret, profile, done) => {
  try {
    const [user] = await User.findOrCreate({
      where: { socialId: profile.id, socialProvider: 'twitter' },
      defaults: {
        firstName: profile.username,
        username: profile.emails[0].value,
        email: profile.emails[0].value,
        socialProvider: profile.provider,
        isEmailVerified: true,
      },
    });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

export const googleAuth = async (token, tokenSecret, profile, done) => {
  try {
    const [user] = await User.findOrCreate({
      where: { socialId: profile.id, socialProvider: 'google' },
      defaults: {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        username: profile.emails[0].value,
        email: profile.emails[0].value,
        socialProvider: profile.provider,
        isEmailVerified: true,
      },
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new FacebookStrategy(credentials.facebook, facebookAuth));
passport.use(new TwitterStrategy(credentials.twitter, twitterAuth));
passport.use(new GoogleStrategy(credentials.google, googleAuth));

export default passport;
