import { Router } from 'express';
import requireAuthentication from '../middlewares/requireAuthentication';
import * as UserController from '../controllers/UserCotroller';


export default () => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());

  protectedRouter.get('/', UserController.index());
  protectedRouter.get('/userInfo', UserController.userInfo());
  protectedRouter.get('/show/:username', UserController.validate('show'), UserController.show());
  protectedRouter.post('/logout', UserController.logout());

  // Unprotected Routes
  const openRouter = Router();
  openRouter.post('/register', UserController.validate('register'), UserController.register());
  openRouter.post('/login', UserController.validate('login'), UserController.login());

  return [openRouter, protectedRouter];
};
