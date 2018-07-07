import { combineReducers } from 'redux';
import activeUser from './UserReducer';
import loggedIn from './loginReducer';
import passwordReset from './ResetPassReducer';

const rootReducer = combineReducers({
	activeUser,
	loggedIn,
	passwordReset
});

export default rootReducer;