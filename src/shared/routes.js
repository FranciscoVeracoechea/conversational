// @flow
import type { Component } from 'react';
import type { Observable } from 'rxjs';
import type { Dispatch } from 'redux';
import type { Match } from 'react-router-dom';
import type { $Request } from 'express';
import type {
  Action, ThunkAction,
} from './configureStore';
// Pages
import Home from '../client/pages/Home';
import Profile from '../client/pages/Profile';


type Props = {};
type State = {};
type GetState = () => {};

export interface Pageable {
  initialAction(distpatch: Dispatch<Action>, getState: GetState, match: Match, req: $Request): Observable<mixed>
  | Promise<mixed>
  | Action
  | ThunkAction;
  render(void): Element<any>;
}

export type Route = {
  path: string,
  component: Pageable & Component<Props, State> | Function,
  exact?: boolean,
  sensitive?: boolean,
  strict?: boolean,
};

const routes: Array<Route> = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/profile/:username',
    component: Profile,
  }
];

export default routes;
