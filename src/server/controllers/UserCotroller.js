import { body } from 'express-validator';
import User from '../models/User';
import validationResult from '../middlewares/validationResult';
import { switchCase } from '../../shared/utils/functional';


// validations
export const validate = (methodName) => {
  const validations = switchCase({
    register: [
      body('email').isEmail(),
      body('password').isLength({ min: 5, max: 78 }),
      body('username').not().isEmpty().trim()
        .isLength({ min: 5, max: 12 }),
      body('secret').custom((value) => {
        if (value && value !== process.env.SECRET) {
          throw new Error('Invalid value');
        }
        return true;
      }),
    ],
    login: [
      body('email').isEmail(),
      body('password').isLength({ min: 5, max: 78 }),
    ],
  })(false)(methodName);
  return validations ? [...validations, validationResult()] : [];
};

// response methods
export const show = () => (req, res, next) => {
  if (req.sessionID && req.session && req.session?.user) {
    res.status(200).json({ user: req.session.user, sessionID: req.sessionID });
  } else {
    const error = new Error('Unauthorized');
    error.status = 401;
    next(error);
  }
};

export const register = () => (req, res, next) => {
  const { email, username } = req.body;
  User.create({
    email,
    username,
    password: req.body.password,
  }).then(({ _doc: user }) => {
    req.session.user = user;
    res.status(200).json({ message: 'User Created successfully!', user });
  })
    .catch(next);
};

export const login = () => (req, res, next) => {
  const { email, password } = req.body;
  User.authenticate(email, password)
    .then(({ _doc: user }) => {
      req.session.user = user;
      res.status(200).json({ message: 'User Logged in successfully!', user });
    })
    .catch(next);
};

export const logout = () => (req, res, next) => {
  if (req.sessionID && req.session && req.session?.user) {
    // delete session object
    req.sessionStore.destroy(req.sessionID);
    req.session.destroy(err => (
      err
        ? next(err)
        : req.status(200).json({ message: 'User Logged Out Successfully' })
    ));
  } else {
    next(new Error('No session exits'));
  }
};
