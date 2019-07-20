import { body, oneOf, param } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import validationResult from '../middlewares/validationResult';
import { switchCase, newError } from '../../shared/utils/functional';


const {
  SECRET, APP_URL, TOKEN_LIFE, APP_TITLE,
} = process.env;
const jwtOptions = { expiresIn: TOKEN_LIFE, audience: APP_URL, issuer: APP_TITLE };

// validations
export const validate = (methodName) => {
  const validations = switchCase({
    show: [
      param('id').isMongoId(),
    ],
    register: [
      body('email').isEmail().custom(email => User.findOne({ email }).then((user) => {
        if (user) return Promise.reject(new Error('E-mail already in use'));
      })),
      body('password').isLength({ min: 5, max: 78 }),
      body('username').not().isEmpty().trim()
        .isLength({ min: 4, max: 12 })
        .custom(username => User.findOne({ username }).then((user) => {
          if (user) return Promise.reject(new Error('Username already in use'));
        })),
    ],
    login: [
      oneOf([
        body('email').isEmail(),
        body('username').not().isEmpty().trim()
          .isLength({ min: 4, max: 12 }),
      ]),
      body('password').isLength({ min: 5, max: 78 }),
    ],
  })(false)(methodName);
  return validations ? [...validations, validationResult()] : [];
};
// helper methods
const emailOrUsername = (email, username) => {
  const identity = email ? 'email' : 'username';
  return { [identity]: identity === 'email' ? email : username };
};
const getSafeData = ({ salt, password, ...data }) => data;

// response methods
export const index = () => (req, res, next) => {
  return User.find()
    .then(data => res.status(200).json({
      message: 'Sucessfull Request',
      data,
    }))
    .catch(next);
};

export const show = () => (req, res, next) => User.findById(req.params.id)
  .then(data => res.status(200).json({
    message: 'Sucessfull Request',
    data,
  }))
  .catch(next);

// response methods
export const userByToken = () => (req, res) => {
  return res.status(200)
    .json({
      message: 'Sucessfull Request',
      data: { user: getSafeData(req.user._doc) },
    });
};

export const register = () => (req, res, next) => {
  const {
    email, username, password,
  } = req.body;
  User.create({
    email,
    username,
    password,
  }).then(({ _doc: data }) => {
    jwt.sign(
      { username: data.username, _id: data._id, email: data.email },
      SECRET,
      jwtOptions,
      (error, token) => {
        if (error) next(newError('Error signing token')({ status: 500, error }));
        res.status(200).json({
          message: 'User created in successfully!',
          data: { user: getSafeData(data) },
          token: `Bearer ${token}`,
        });
      }
    );
  })
    .catch(next);
};

export const login = () => (req, res, next) => {
  const {
    email, password, username,
  } = req.body;
  User.findOne(emailOrUsername(email, username))
    .then((user) => {
      if (!user) return next(newError('Account Not Found')({ status: 404 }));
      if (user.checkPassword(password)) {
        const { _doc: data } = user;
        jwt.sign(
          { username: data.username, _id: data._id, email: data.email },
          SECRET,
          jwtOptions,
          (error, token) => {
            if (error) next(newError('Error signing token')({ status: 500, error }));
            res.status(200).json({
              message: 'User logged in successfully!',
              data: { user: getSafeData(data) },
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        next(newError('Invalid Credentials')({ status: 401 }));
      }
    })
    .catch(next);
};
