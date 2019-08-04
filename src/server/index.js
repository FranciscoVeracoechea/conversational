// dependencies
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import favicon from 'serve-favicon';
// configs
import './configs/dbConnection';
import passport from './configs/passport';
import appSetter from './configs/appSetter';
import development from './configs/development';
import production from './configs/production';
//

import deviceDetection from './middlewares/deviceDetection';
// API router
import ApiRouter from './API';


dotenv.config();
const isAnalyzer = process.env.ANALYZER === 'true';
const isDev = process.env.NODE_ENV === 'development';

const app = express();
appSetter(app);

app.use('/', express.static(path.join(__dirname, '..', '..', 'public')));
app.use('/statics', express.static(path.join(__dirname, '..', '..', 'statics')));
app.use(favicon(path.join(__dirname, '..', '..', 'statics', 'favicon.ico')));
app.use(cors());
app.use(helmet());
app.use(cookieSession({
  name: 'conversational',
  keys: [process.env.SECRET],
  maxAge: process.env.TOKEN_LIFE,
}));
app.use(deviceDetection());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

ApiRouter(app);

// development configurations
development(app, isDev, isAnalyzer);
// production configurations
production(app, isDev);

app.listen(app.get('port'), (err) => {
  if (!err && !isAnalyzer) {
    /* eslint-disable */
    console.log(`Server listening on ${process.env.APP_URL}`);
    /* eslint-enable */
  }
});
