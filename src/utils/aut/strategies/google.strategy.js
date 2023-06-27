import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { config } from '../../../config/config.js';

const options = {
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "http://localhost:5137/",
    passReqToCallback   : true
}

export const googleStrategy = new GoogleStrategy(options, (req, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
);