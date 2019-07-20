export default (app, isDev, isAnalyzer) => {
  if (isDev) {
    Promise.all([
      import('morgan'),
      import('errorhandler'),
      import('../webpackDevServer.js'),
    ]).then(([
      morgan, errorhandler, { default: webpackDevServer },
    ]) => {
      app.use(morgan('dev'));
      webpackDevServer(app, { isAnalyzer });
      app.use(errorhandler());
    }).catch(e => console.error(e.stack));
  }
};
