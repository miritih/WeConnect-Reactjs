import { combineReducers } from 'redux';
import currentUser from './UserReducer';
import registerUser from './registerUserReducer';
import userLogin from './loginReducer';
import passwordReset from './ResetPassReducer';
import businesses from './businessReducers';
import userBusinesses from './userBusinessReducer';

const rootReducer = combineReducers({
	currentUser,
	userLogin,
	passwordReset,
	registerUser,
	businesses,
	userBusinesses
});

export default rootReducer;