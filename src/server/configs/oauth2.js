// dependencies
import dotenv from 'dotenv';
import oauth2orize from 'oauth2orize';
// models
import User from '../models/User';
import AccessToken from '../models/auth/AccessToken';
import RefreshToken from '../models/auth/RefreshToken';
// utils
import getToken from '../../shared/utils/getToken';


dotenv.config();
const { TOKEN_LIFE } = process.env;
const server = oauth2orize.createServer();
// Exchange username & password for an access token.
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.checkPassword(password)) { return done(null, false); }

    RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, (e) => {
      if (e) return done(e);
    });
    AccessToken.remove({ userId: user.userId, clientId: client.clientId }, (e) => {
      if (e) return done(e);
    });

    const tokenValue = getToken();
    const refreshTokenValue = getToken();
    const token = new AccessToken({
      token: tokenValue, clientId: client.clientId, userId: user.userId,
    });
    const refreshToken = new RefreshToken({
      token: refreshTokenValue, clientId: client.clientId, userId: user.userId,
    });
    refreshToken.save((e) => {
      if (e) { return done(e); }
    });
    const info = { scope: '*', expires_in: TOKEN_LIFE };
    token.save((error) => { // (error, token)
      if (error) { return done(err); }
      done(null, tokenValue, refreshTokenValue, info);
    });
  });
}));

// Exchange refreshToken for an access token.
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
  RefreshToken.findOne({ token: refreshToken }, (error, token) => {
    if (error) { return done(error); }
    if (!token) { return done(null, false); }
    if (!token) { return done(null, false); }

    User.findById(token.userId, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      RefreshToken.remove({ userId: user.userId, clientId: client.clientId }, (e) => {
        if (e) return done(e);
      });
      AccessToken.remove({ userId: user.userId, clientId: client.clientId }, (e) => {
        if (e) return done(e);
      });

      const tokenValue = getToken();
      const refreshTokenValue = getToken();
      const accessToken = new AccessToken({
        token: tokenValue, clientId: client.clientId, userId: user.userId,
      });
      const newRefreshToken = new RefreshToken({
        token: refreshTokenValue, clientId: client.clientId, userId: user.userId,
      });
      newRefreshToken.save((e) => {
        if (e) { return done(e); }
      });
      const info = { scope: '*', expires_in: TOKEN_LIFE };
      accessToken.save((e) => { // (e, token)
        if (e) { return done(e); }
        done(null, tokenValue, refreshTokenValue, info);
      });
    });
  });
}));

// token endpoint
export default passport => [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler(),
];
