import passport from 'passport';
import models from '../db/models';
const path = require('path');

const { User } = models;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: 2670543582987684,
  clientSecret: 'f8ab516da80edebd1de60b6b350955ba',
  callbackURL: 'http://localhost:3000/api/v1/auth/facebook/callback',
},

(accessToken, refreshToken, profile, done) => {
  User.findOne({
    'facebook.id': profile.id
  }, (err, user) => {
    if (err) return done(err);

    if (!user) {
      const data = {
        email: profile.emails[0].value,
        username: profile.emails[0].value,
      };
    }
  });
}));

export default passport;
