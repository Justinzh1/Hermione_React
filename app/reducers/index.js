import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import course from './course';

export default combineReducers({
  messages,
  auth,
  course
});
