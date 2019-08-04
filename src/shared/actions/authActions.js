import root from 'window-or-global';
import { iif } from '../utils/functional';


export const actionTypes = {
  saveData: 'SAVE_AUTHENTICATION_DATA',
  fetchUserInfo: 'FETCH_AUTHENTICATED_USER_INFO',
  saveUserInfo: 'SAVE_AUTHENTICATED_USER_INFO',
  fetchRegister: 'FETCH_REGISTER',
  fetchRegisterCancelled: 'FETCH_REGISTER_CANCELLED',
  fetchRegisterRejected: 'FETCH_REGISTER_REJECTED',
  fetchLogin: 'FETCH_LOGIN',
  loginRejected: 'LOGIN_REJECTED',
  getToken: 'GET_TOKEN',
  logout: 'LOGOUT',
};

// general auth actions  ---------------------------------
export const saveData = ({ data: { user }, token }) => {
  root.localStorage.setItem('token', token);
  return {
    type: actionTypes.saveData,
    payload: { user, token },
  };
};

export const getToken = () => ({
  type: actionTypes.getToken,
  payload: { token: root.localStorage.getItem('token') || '' },
});

export const fetchUserInfo = () => ({ type: actionTypes.fetchUserInfo });

export const saveUserInfo = user => ({
  type: actionTypes.saveUserInfo,
  payload: { user },
});

export const saveUserFromServer = req => ({
  type: actionTypes.saveUserInfo,
  payload: { user: req.session.user },
});

export const logout = () => {
  root.localStorage.removeItem('token');
  return {
    type: actionTypes.logout,
  };
};

// register actions  -------------------------------------
export const fetchRegisterRejected = ({ response }) => {
  root.localStorage.removeItem('token');
  return {
    type: actionTypes.fetchRegisterRejected,
    payload: response,
  };
};

export const fetchRegisterCancelled = () => ({
  type: actionTypes.fetchRegisterCancelled,
});

export const fetchRegister = ({ email, username, password }) => ({
  type: actionTypes.fetchRegister,
  payload: { email, username, password },
});

// login actions ----------------------------------------
export const loginRejected = ({ response }) => ({
  type: actionTypes.fetchRegisterRejected,
  payload: response,
});

export const fetchLogin = ({ username, email, password }) => ({
  type: actionTypes.fetchLogin,
  payload: iif(username)({ username, password })({ email, password }),
});
