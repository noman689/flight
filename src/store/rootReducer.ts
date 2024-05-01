import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';

const reducers = combineReducers({
  app: authReducer,
});

export default reducers;
