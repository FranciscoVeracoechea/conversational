// dependencies
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import dotenv from 'dotenv';
// modles
import User from '../models/User';
import Client from '../models/auth/Client';
import AccessToken from '../models/auth/AccessToken';


dotenv.config();
const { TOKEN_LIFE } = process.env;

passport.use(
  new BasicStrategy(
    (username, password, done) => {
      Client.findOne({ clientId: username }, (err, client) => {
        if (err) { return done(err); }
        if (!client) { return done(null, false); }
        if (client.clientSecret !== password) { return done(null, false); }

        return done(null, client);
      });
    }
  )
);

passport.use(
  new ClientPasswordStrategy(
    (clientId, clientSecret, done) => {
      Client.findOne({ clientId }, (err, client) => {
        if (err) { return done(err); }
        if (!client) { return done(null, false); }
        if (client.clientSecret !== clientSecret) { return done(null, false); }

        return done(null, client);
      });
    }
  )
);

passport.use(
  new BearerStrategy(
    (accessToken, done) => {
      AccessToken.findOne({ token: accessToken }, (error, token) => {
        if (error) { return done(error); }
        if (!token) { return done(null, false); }

        if (Math.round((Date.now() - token.created) / 1000) > TOKEN_LIFE ) {
          AccessToken.remove({ token: accessToken }, (err) => {
            if (err) return done(err);
          });
          return done(null, false, { message: 'Token expired' });
        }

        User.findById(token.userId, (e, user) => {
          if (e) { return done(e); }
          if (!user) { return done(null, false, { message: 'Unknown user' }); }

          const info = { scope: '*' };
          done(null, user, info);
        });
      });
    }
  )
);

export default passport;
