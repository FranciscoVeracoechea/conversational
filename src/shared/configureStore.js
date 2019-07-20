// @flows
import {
  createStore, applyMiddleware, compose,
} from 'redux';
import root from 'window-or-global';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// redux middlewares
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { createEpicMiddleware } from 'redux-observable';
// Epics
import rootEpic from './epics';
// Reducers
import rootReducer from './reducers';

/* eslint-disable */
export type Action = {
  type: string,
  payload?: mixed,
};

export type ThunkAction = (
  dispatch: (Action) => mixed,
  getState: (void) => {}
) => void | mixed;
/* eslint-enable */

export default (params) => {
  const {
    location = '',
    state = {},
    server = false,
  } = params;

  const epic$ = new BehaviorSubject(rootEpic);
  const composeEnhancers = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const hotReloadingEpic = (...args) => epic$.pipe(switchMap(epic => epic(...args)));

  const history = server
    ? createMemoryHistory({
      initialEntries: [location],
    })
    : createBrowserHistory();

  const epicMiddleware = createEpicMiddleware();

  const middlewares = [
    thunk,
    routerMiddleware(history),
    epicMiddleware,
    reduxImmutableStateInvariant(),
  ];

  const result = {
    store: createStore(
      rootReducer(history),
      state,
      composeEnhancers(applyMiddleware(...middlewares)),
    ),
    history,
  };
  epicMiddleware.run(hotReloadingEpic);
  if (module.hot) {
    module.hot.accept('./epics', () => {
      import('./epics')
        .then(nextRootEpic => epic$.next(nextRootEpic))
        .catch(console.error);
    });
  }
  return result;
};
