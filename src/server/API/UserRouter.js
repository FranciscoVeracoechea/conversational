import { Router } from 'express';
import * as UserController from '../controllers/UserCotroller';


export default (requireAuthentication) => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());

  protectedRouter.get('/token', UserController.userByToken());
  protectedRouter.get('/', UserController.index());
  protectedRouter.get('/:id', UserController.validate('show'), UserController.show());

  // Unprotected Routes
  const openRouter = Router();
  openRouter.post('/register', UserController.validate('register'), UserController.register());
  openRouter.post('/login', UserController.validate('login'), UserController.login());

  return [openRouter, protectedRouter];
};
