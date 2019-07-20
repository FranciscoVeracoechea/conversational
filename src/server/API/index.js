import passport from 'passport';
import UserRouter from './UserRouter';


export default (app) => {
  const requireAuthentication = () => passport.authenticate('jwt', { session: false });

  app.use('/api/user', UserRouter(requireAuthentication));
};
