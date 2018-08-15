import { combineReducers } from 'redux';
import currentUser from './UserReducer';
import registerUser from './registerUserReducer';
import userLogin from './loginReducer';
import passwordReset from './ResetPassReducer';

const rootReducer = combineReducers({
	currentUser,
	userLogin,
	passwordReset,
	registerUser,
});

export default rootReducer;