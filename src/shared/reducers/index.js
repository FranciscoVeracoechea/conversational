import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './authReducer';
import device from './deviceReducer';


export default history => combineReducers({
  router: connectRouter(history),
  auth,
  device,
});
