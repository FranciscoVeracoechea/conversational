// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as authEpic from './authEpic';


export default combineEpics(
  ...Object.values(authEpic),
);
