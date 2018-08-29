import { combineReducers } from 'redux';
import currentUser from './UserReducer';
import registerUser from './registerUserReducer';
import userLogin from './loginReducer';
import passwordReset from './ResetPassReducer';
import businesses from './businessReducers';
import userBusinesses from './userBusinessReducer';
import newBusiness from './createBusinessReducer';
import businessProfile from './businessProfileReducer';

const rootReducer = combineReducers({
	currentUser,
	userLogin,
	passwordReset,
	registerUser,
	businesses,
	userBusinesses,
	newBusiness,
	businessProfile,
});

export default rootReducer;
