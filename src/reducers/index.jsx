import { combineReducers } from 'redux';
import users from './registerUserReducer';

const rootReducer = combineReducers({
	users
});

export default rootReducer;