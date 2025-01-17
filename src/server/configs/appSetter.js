import dotenv from 'dotenv';


dotenv.config();

const appSetter = (app) => {
  app.set('port', process.env.NODE_PORT || 3333);
  app.set('node_env', process.env.NODE_ENV);
  app.set('browserEnv', {
    appTitle: process.env.APP_TITLE,
    appUrl: process.env.APP_URL,
    facebookId: process.env.FACEBOOK_APP_ID,
    defaultDescription: process.env.DEFAULT_DESCRIPTION,
    defaultTwitter: process.env.DEFAULT_TWITTER,
  });
  global.browserEnv = app.get('browserEnv');
};

export default appSetter;
