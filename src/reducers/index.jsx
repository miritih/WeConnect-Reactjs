import { combineReducers } from 'redux';
import activeUser from './UserReducer';
import loggedIn from './loginReducer';

const rootReducer = combineReducers({
	activeUser,
	loggedIn
});

export default rootReducer;