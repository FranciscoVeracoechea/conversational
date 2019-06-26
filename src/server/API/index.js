import UserRouter from './UserRouter';


export default (app) => {
  app.use('/api/blog', UserRouter());
};
