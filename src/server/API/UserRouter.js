import { Router } from 'express';
import * as UserController from '../controllers/UserCotroller';


export default () => {
  const router = Router();

  router.get('/', UserController.validate('show'), UserController.show());
  router.post('/register', UserController.validate('register'), UserController.register());
  router.post('/login', UserController.validate('login'), UserController.login());
  router.post('/logout', UserController.logout());
  return router;
};
