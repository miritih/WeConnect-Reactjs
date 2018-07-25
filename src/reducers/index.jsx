import { combineReducers } from 'redux';
import currentUser from './UserReducer';
import registerUser from './registerUserReducer';
import userLogin from './loginReducer';
import passwordReset from './ResetPassReducer';
import profileUpdate from './profileReducer';

const rootReducer = combineReducers({
	currentUser,
	userLogin,
	passwordReset,
	registerUser,
	profileUpdate
});

export default rootReducer;