// dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// reducers
import auth from './authReducer';
import device from './deviceReducer';
import profile from './profileReducer';


export default history => combineReducers({
  router: connectRouter(history),
  auth,
  device,
  profile,
});
