// dependencies
import root from 'window-or-global';
import { ofType } from 'redux-observable';
import {
  mergeMap, map, filter, catchError,
} from 'rxjs/operators';
import { of } from 'rxjs';
// request helper
import request from '../utils/Request';
// action types
import {
  actionTypes, saveUserInfo, saveData, fetchRegisterRejected, loginRejected,
} from '../actions/authActions';


export const fetchUserInfoEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchUserInfo),
  map(action => ({ ...action, token: root.localStorage.getItem('token') })),
  filter(action => action.token),
  mergeMap(action => request({
    url: '/api/user/token',
    method: 'GET',
    headers: { Authorization: action.token },
  }).pipe(
    map(({ response }) => saveUserInfo(response)),
    catchError(error => of(fetchRegisterRejected(error))),
  )),
);

export const fetchRegisterEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchRegister),
  mergeMap(action => request({
    url: '/api/user/register',
    method: 'POST',
    body: action.payload,
  }).pipe(
    map(({ response }) => saveData(response)),
    catchError(error => of(fetchRegisterRejected(error))),
  ))
);

export const fetchLoginEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchLogin),
  mergeMap(action => request({
    url: '/api/user/login',
    method: 'POST',
    body: action.payload,
  }).pipe(
    map(({ response }) => saveData(response)),
    catchError(error => of(loginRejected(error)))
  ))
);
