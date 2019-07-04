// dependencies
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import favicon from 'serve-favicon';
import morgan from 'morgan';
// configs
import './configs/dbConnection';
import passport from './configs/passport';
import oauth2 from './configs/oauth2';
import appSetter from './configs/appSetter';
// middlewares
import gzip from './middlewares/gzip';
import errorHandler from './middlewares/errorHandler';
import deviceDetection from './middlewares/deviceDetection';
// API router
import ApiRouter from './API';


dotenv.config();
const isAnalyzer = process.env.ANALYZER === 'true';
const isDev = process.env.NODE_ENV === 'development';

const app = express();
appSetter(app);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(deviceDetection());
if (isDev) app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
app.use(passport.initialize());
app.post('/oauth/token', oauth2(passport));
app.get(
  '/api/userInfo',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    // req.authInfo is set using the `info` argument supplied by
    // `BearerStrategy`.  It is typically used to indicate a scope of the token,
    // and used in access control checks.  For illustrative purposes, this
    // example simply returns the scope in the response.
    res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope });
  }
);
ApiRouter(app);

if (isDev) {
  import('./webpackDevServer')
    .then(({ default: webpackDevServer }) => webpackDevServer(app, { isAnalyzer }));
} else {
  app.get('bundle.\*.js', gzip());
  const SSR_PATH = path.join(__dirname, '..', '..', 'dist', 'serverSideRender.js');
  const STATS_PATH = path.join(__dirname, '..', '..', 'compilationStats.json');
  Promise.all([import(SSR_PATH), import(STATS_PATH)])
    .then(([{ default: serverRenderer }, clientStats]) => {
      app.use(
        serverRenderer(
          { browserEnv: app.get('browserEnv'), clientStats }
        )
      );
    });
}

app.use(errorHandler({ isDev }));

app.listen(app.get('port'), (err) => {
  if (!err && !isAnalyzer) {
    /* eslint-disable */
    console.log(`Server listening on ${process.env.APP_URL}`);
    /* eslint-enable */
  }
});
