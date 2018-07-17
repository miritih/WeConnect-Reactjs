import { combineReducers } from 'redux';
import currentUser from './UserReducer';
import registerUser from './registerUserReducer';
import loggedIn from './loginReducer';
import passwordReset from './ResetPassReducer';

const rootReducer = combineReducers({
	currentUser,
	loggedIn,
	passwordReset,
	registerUser
});

export default rootReducer;