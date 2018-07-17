import {LOAD_USER_SUCCESS} from './actiontypes';
import AuthService from '../Components/Auth/AuthService';

export function loadUserSuccess(user) {
	return {
		'type': LOAD_USER_SUCCESS,
		user
	};
}

const Auth = new AuthService();
export function loadCurrentUser() {
	return function (dispatch) {
		return dispatch(loadUserSuccess(Auth.getUser()));
	};
}