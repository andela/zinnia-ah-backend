import passport from 'passport';
import dotenv from 'dotenv';
import models from '../../db/models';
import { socialController } from '../controllers/users';

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
    callbackURL: process.env.TWITTER_APP_CALLBACK,
    userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    profileFields: ['id', 'email', 'name'],
  }
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

const facebookAuth = async (accessToken, refreshToken, profile, done) => {
  try {
    const currentUser = await User.findOrCreate({
      where: { socialId: profile.id, socialProvider: 'facebook' },
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

const twitterAuth = async (token, tokenSecret, profile, done) => {
  console.log('profile------', profile)
  try {
    const user = await User.findOrCreate({
      where: { socialId: profile.id, socialProvider: 'twitter' },
      defaults: {
        firstName: profile.name,
        username: profile.username,
        email: profile.email,
        socialProvider: profile.provider
      }
    });

    passport.deserializeUser((id, done) => {
      done(err, user);
    });
    return done(null, user.id);
  } catch (err) {
    return done(err);
  }
};

passport.use(new FacebookStrategy(credentials.facebook, facebookAuth));
passport.use(new TwitterStrategy(credentials.twitter, twitterAuth));

export default passport;
